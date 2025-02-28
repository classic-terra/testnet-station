import { useChainID } from "auth/hooks/useNetwork"
import { LAZY_LIMIT } from "config/constants"

export const useIsClassic = () => {
  const networkName = useChainID()
  //return chainId.startsWith("columbus")
  let classic = false
  if (networkName === "columbus-5") {
    classic = true
  }
  if (networkName === "rebel-2") {
    classic = true
  }
  return classic // TODO
}

/* refetch */
export const RefetchOptions = {
  DEFAULT: /* onMount, onFocus */ {},
  INFINITY: { staleTime: Infinity, retry: false },
}

/* params */
export const Pagination = {
  "pagination.limit": String(LAZY_LIMIT),
}

/* helpers */
export const combineState = (...results: QueryState[]) => ({
  isIdle: results.some((result) => result.isIdle),
  isLoading: results.some((result) => result.isLoading),
  isFetching: results.some((result) => result.isFetching),
  isSuccess: results.every((result) => result.isSuccess),
  error: results.find((result) => result.error)?.error,
})

/* queryKey */
const mirror = <T>(obj: T, parentKey?: string): T =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    const next = value
      ? mirror(value, key)
      : [parentKey, key].filter(Boolean).join(".")

    return { ...acc, [key]: next }
  }, {} as T)

export const queryKey = mirror({
  /* assets */
  TerraAssets: "",
  TerraAPI: "",
  History: "",

  /* lcd */
  auth: { accountInfo: "" },
  bank: { balance: "", balances: "", supply: "" },
  distribution: {
    rewards: "",
    communityPool: "",
    validatorCommission: "",
    withdrawAddress: "",
  },
  gov: {
    votingParams: "",
    depositParams: "",
    tallyParams: "",
    proposals: "",
    proposal: "",
    deposits: "",
    votes: "",
    tally: "",
  },
  ibc: { denomTrace: "" },
  market: { params: "" },
  oracle: { activeDenoms: "", exchangeRates: "", params: "" },
  tendermint: { nodeInfo: "" },
  staking: {
    validators: "",
    validator: "",
    delegations: "",
    delegation: "",
    unbondings: "",
    pool: "",
  },
  treasury: { taxRate: "", taxCap: "" },
  tx: { txInfo: "", create: "" },
  wasm: { contractInfo: "", contractQuery: "" },

  /* external */
  Anchor: { TotalDeposit: "", APY: "", MarketEpochState: "" },
  TNS: "",
})
