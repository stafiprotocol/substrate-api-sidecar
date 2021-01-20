import { BlockHash } from '@polkadot/types/interfaces';
import { BadRequest } from 'http-errors';
import {
	IErasRewardPoint,
	IErasRewardPoints,
	IErasRewardPointsList,
} from '../../types/responses';

import { AbstractService } from '../AbstractService';

export class ErasRewardPointsService extends AbstractService {
	/**
	 * Fetch ErasRewardPoints.
	 *
	 * @param hash `BlockHash` to make call at
	 * @param depth number of eras to query at and below the specified era
	 * @param era the most recent era to query
	 */
	async fetchErasRewardPoints(
		hash: BlockHash,
		depth: number,
		era: number,
		currentEra: number
	): Promise<IErasRewardPointsList | { message: string }>  {
		const { api } = this;

		const [historyDepth] = await Promise.all([
			api.query.staking.historyDepth.at(hash),
		]);

		// Information is kept for eras in `[current_era - history_depth; current_era]`
		if (depth > historyDepth.toNumber()) {
			throw new BadRequest(
				'Must specify a depth less than history_depth'
			);
		}
		if (era - (depth - 1) < currentEra - historyDepth.toNumber()) {
			// In scenarios where depth is not > historyDepth, but the user specifies an era
			// and historyDepth combo that would lead to querying eras older than history depth
			throw new BadRequest(
				'Must specify era and depth such that era - (depth - 1) is less ' +
					'than or equal to current_era - history_depth.'
			);
		}

		const erasRewardPoints: (IErasRewardPoints )[] = [];
		const erasRewardPoint: (IErasRewardPoint)[] = [];

		// User friendly - we don't error if the user specified era & depth combo <= 0, instead just start at 0
		const startEra = era - (depth - 1) < 0 ? 0 : era - (depth - 1);

		for (let e = startEra; e <= era; e += 1) {
			const eraIndex = api.createType('EraIndex', era);
			const [
				eraRewardPoints,
			] = await Promise.all([
				api.query.staking.erasRewardPoints.at(hash, era),
			]);

		for (const [id] of eraRewardPoints.individual.entries()) {
			let validator_id = id.toString();
			erasRewardPoint.push(
				{
					validator_id
				}
			);
		}
		const totalEraRewardPoints = eraRewardPoints.total;
		erasRewardPoints.push(
			{
				era: eraIndex,
				totalEraRewardPoints,
				erasRewardPoint
			}
		);
		}

		return {
			erasRewardPoints
		};
	}
}
