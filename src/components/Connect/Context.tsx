'use client';

import MetaMaskOnboarding from '@metamask/onboarding';

import { createContext, useContext, useCallback, useState, PropsWithChildren, useRef, useEffect } from 'react';
// import { useRouter } from 'next/navigation';

export interface WalletContextValue {
  connected: boolean;
  account?: string;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

interface WalletProviderProps {}

export const WalletContext = createContext<WalletContextValue>({
  connected: false,
  connect: () => Promise.resolve(),
  disconnect: () => Promise.resolve(),
});

export const WalletProvider = ({ children }: PropsWithChildren<WalletProviderProps>) => {
  const onboarding = useRef<MetaMaskOnboarding>();

  // const router = useRouter();
  const [state, setState] = useState<Omit<WalletContextValue, 'connect' | 'disconnect'>>({
    connected: false,
  });

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  const connect = useCallback(async () => {
    if (state.connected) {
      Promise.resolve();
      return;
    }

    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      try {
        const newAccount = (await window.ethereum?.request({ method: 'eth_requestAccounts' })) as string[];

        if (newAccount && newAccount.length > 0) {
          const [account] = newAccount;
          setState({ connected: true, account: account });
          console.log('Connection successfully done... thank you.');
          console.log('Wallet Address : ' + account);
        }
      } catch (error : any) {
        console.log(`Error : ${error.message}, Code : ${error.code}`);
      }
    } else {
      onboarding.current?.startOnboarding();
    }

    Promise.resolve();
    return;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.connected]);

  const disconnect = useCallback(async () => {
    if (!state.connected) {
      Promise.resolve();
      return;
    }

    // @todo: implement this flow
    setState({ connected: false });
  }, [state.connected]);

  return (
    <WalletContext.Provider
      value={{
        ...state,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  return useContext(WalletContext);
};
