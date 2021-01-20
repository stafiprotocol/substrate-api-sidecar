import { ApiPromise } from '@polkadot/api';
import { Option } from '@polkadot/types';
import * as BN from 'bn.js';
import { RequestHandler } from 'express';
import { BadRequest, InternalServerError } from 'http-errors';

import { ErasRewardPointsService } from '../../services';
import AbstractController from '../AbstractController';


export default class ErasRewardPointsController extends AbstractController<
	ErasRewardPointsService
> {
	constructor(api: ApiPromise) {
		super(
			api,
			'/staking/eras-reward-points',
			new ErasRewardPointsService(api)
		);
		this.initRoutes();
	}

	protected initRoutes(): void {
		this.safeMountAsyncGetHandlers([
			['', this.getErasRewardPoints],
		]);
	}
	
	private getErasRewardPoints: RequestHandler = async (
		{query: { depth, era } },
		res
	): Promise<void> => {
		const { hash, eraArg, currentEra } = await this.getEraAndHash(
			this.verifyAndCastOr('era', era, undefined)
		);

		ErasRewardPointsController.sanitizedSend(
			res,
			await this.service.fetchErasRewardPoints(
				hash,
				this.verifyAndCastOr('depth', depth, 1) as number,
				eraArg,
				currentEra
			)
		);
	};

	private async getEraAndHash(era?: number) {
		const [
			hash,
			activeEraOption,
			currentEraMaybeOption,
		] = await Promise.all([
			this.api.rpc.chain.getFinalizedHead(),
			this.api.query.staking.activeEra(),
			this.api.query.staking.currentEra(),
		]);

		if (activeEraOption.isNone) {
			throw new InternalServerError(
				'ActiveEra is None when Some was expected'
			);
		}
		const activeEra = activeEraOption.unwrap().index.toNumber();

		let currentEra;
		if (currentEraMaybeOption instanceof Option) {
			if (currentEraMaybeOption.isNone) {
				throw new InternalServerError(
					'CurrentEra is None when Some was expected'
				);
			}

			currentEra = currentEraMaybeOption.unwrap().toNumber();
		} else if ((currentEraMaybeOption as unknown) instanceof BN) {
			// EraIndex extends u32, which extends BN so this should always be true
			currentEra = (currentEraMaybeOption as BN).toNumber();
		} else {
			throw new InternalServerError(
				'Query for current_era returned a non-processable result.'
			);
		}

		if (era !== undefined && era > activeEra - 1) {
			throw new BadRequest(
				`The specified era (${era}) is too large. ` +
					`Largest era payout info is available for is ${
						activeEra - 1
					}`
			);
		}

		return {
			hash,
			eraArg: era === undefined ? activeEra - 1 : era,
			currentEra,
		};
	}
}
