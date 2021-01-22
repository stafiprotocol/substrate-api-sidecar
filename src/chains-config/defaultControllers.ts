import { ControllerConfig } from '../types/chains-config';

/**
 * Controllers that Sidecar will always default to. This will always be
 * the optimal controller selection for Polkadot and Kusama.
 */
export const defaultControllers: ControllerConfig = {
	controllers: {
		Blocks: true,
		AccountsStakingPayouts: true,
		AccountsBalanceInfo: true,
		AccountsStakingInfo: true,
		AccountsVestingInfo: true,
		ErasRewardPoints: true,
		NodeNetwork: true,
		NodeVersion: true,
		NodeTransactionPool: true,
		RuntimeCode: true,
		RuntimeSpec: true,
		RuntimeMetadata: true,
		TransactionDryRun: true,
		TransactionMaterial: true,
		TransactionFeeEstimate: true,
		TransactionSubmit: true,
		PalletsStakingProgress: true,
		PalletsStorage: true,
	},
	options: {
		finalizes: true,
	},
};
