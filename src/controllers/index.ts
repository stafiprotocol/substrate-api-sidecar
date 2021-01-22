import {
	AccountsBalanceInfo,
	AccountsStakingInfo,
	AccountsStakingPayouts,
	AccountsVestingInfo,
} from './accounts';
import { Blocks } from './blocks';
import { ErasRewardPoints } from './staking';
import { NodeNetwork, NodeTransactionPool, NodeVersion } from './node';
import { PalletsStakingProgress, PalletsStorage } from './pallets';
import { RuntimeCode, RuntimeMetadata, RuntimeSpec } from './runtime';
import {
	TransactionDryRun,
	TransactionFeeEstimate,
	TransactionMaterial,
	TransactionSubmit,
} from './transaction';

/**
 * Object containing every controller class definition.
 */
export const controllers = {
	Blocks,
	AccountsBalanceInfo,
	AccountsStakingInfo,
	AccountsVestingInfo,
	AccountsStakingPayouts,
	PalletsStakingProgress,
	PalletsStorage,
	ErasRewardPoints,
	NodeNetwork,
	NodeTransactionPool,
	NodeVersion,
	RuntimeCode,
	RuntimeMetadata,
	RuntimeSpec,
	TransactionDryRun,
	TransactionFeeEstimate,
	TransactionMaterial,
	TransactionSubmit,
};
