import {EraIndex, RewardPoint } from '@polkadot/types/interfaces';

import { IErasRewardPoint } from '.';

export interface IErasRewardPoints {
	era: EraIndex;
	totalEraRewardPoints: RewardPoint;
	erasRewardPoint: IErasRewardPoint[];
}
