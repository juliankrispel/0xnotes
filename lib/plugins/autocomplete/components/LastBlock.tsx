import { useEffect, useState } from "react";
import { metamaskProvider } from "../../../util/metamaskProvider";

export function LastBlock() {
  const [val, setValue] = useState<any>()
  useEffect(() => {
    const run = async () => {
      // metamaskProvider.getBlockWithTransactions()
      metamaskProvider.getBlockNumber().then((val) => {
        metamaskProvider.getBlockWithTransactions(val).then((val) => {
          const {
            gasLimit,
            timestamp,
            gasUsed,
            hash,
            number,
            difficulty,
            baseFeePerGas,
          } = val
          setValue({
            gasLimit,
            timestamp,
            gasUsed,
            hash,
            number,
            difficulty,
            baseFeePerGas,
          })
          setValue(val);
        });
      });
    }
    run()
  })

  return <div>{val !== null ? JSON.stringify(val, null, 2) : "Loading"}</div>;
}