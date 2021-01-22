import { ControllerConfig } from '../types/chains-config';

/**
 * Controllers for Dock's mainnet.
 */
export const dockMainnetControllers: ControllerConfig = {
	controllers: {
		Blocks: true,
		AccountsStakingPayouts: false,
		AccountsBalanceInfo: true,
		AccountsStakingInfo: false,
		AccountsVestingInfo: false,
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
		PalletsStakingProgress: false,
		PalletsStorage: true,
	},
	options: {
		finalizes: true,
	},
};
