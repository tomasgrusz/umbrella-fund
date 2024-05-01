import { useState } from "react";
import { EtherInput } from "~~/components/scaffold-eth";

type UmbrellaSwapProps = {
  onBuy: (amount: string) => Promise<void>;
  onSell: (amount: string) => Promise<void>;
};

/**
 *
 * @param onBuy - The function to call when the user buys $UMB
 * @param onSell - The function to call when the user sells $UMB
 *
 * @returns a component that allows the user to swap $UMB tokens
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UmbrellaSwap: React.FC<UmbrellaSwapProps> = ({ onBuy, onSell }) => {
  const [action, setAction] = useState("Buy");

  const handleToggle = () => {
    if (action === "Buy") {
      setAction("Sell");
      return;
    }
    setAction("Buy");
  };

  // TODO: Implement balance
  const balance = 16.224;

  const [amount, setAmount] = useState("");
  const [outputAmount, setOutputAmount] = useState("");
  const exceededBalance = parseInt(amount) > balance;

  // TODO: Implement swap function
  const swap = async () => {
    if (action === "Buy") {
      console.log(`Buying ${amount} $UMB`);
      await onBuy(amount);
    } else {
      console.log(`Selling ${amount} $UMB`);
      await onSell(amount);
    }
  };

  return (
    <div className="bg-base-100 p-10 rounded-xl">
      <h2 className="text-xl">Swap $UMB</h2>
      <p className="text-sm">Swap your tokens for $UMB and start investing with us.</p>
      <div className="mt-8 flex flex-col gap-4">
        <div className="flex justify-center items-center gap-2">
          Buy
          <input
            id="theme-toggle"
            type="checkbox"
            className="toggle toggle-primary bg-primary hover:bg-primary border-primary"
            onChange={handleToggle}
            checked={action === "Sell"}
          />
          Sell
        </div>
        <div className="flex flex-col justify-center">
          <h3>{action} $UMB</h3>
          <div className="flex justify-center items-center gap-2 mt-4">
            <EtherInput
              placeholder={`0 ${action === "Buy" ? "ETH" : "UMB"}`}
              value={amount}
              onChange={value => setAmount(value)}
            />
            <span>{action === "Buy" ? "ETH" : "UMB"}</span>
          </div>

          <p className="text-xs ml-auto mr-auto underline cursor-pointer" onClick={() => setAmount(balance.toString())}>
            Max. {balance} {action === "Buy" ? "ETH" : "UMB"}
          </p>
          {exceededBalance && (
            <p className="text-xs ml-auto mr-auto underline cursor-pointer text-red-400">
              You don&apos;t have enough balance in your wallet to cover that.
            </p>
          )}

          <label>You will receive:</label>

          <div className="flex justify-center items-center gap-2 mt-4">
            <EtherInput
              placeholder={`0 ${action === "Sell" ? "ETH" : "UMB"}`}
              value={outputAmount}
              onChange={value => setOutputAmount(value)}
            />
            <span>{action === "Sell" ? "ETH" : "UMB"}</span>
          </div>
        </div>

        <button
          className="btn btn-primary mt-4 w-40 self-center"
          onClick={swap}
          disabled={parseInt(amount) <= 0 || amount === "" || exceededBalance}
        >
          Swap
        </button>
      </div>
    </div>
  );
};

export default UmbrellaSwap;
