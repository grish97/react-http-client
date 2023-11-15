import {FC, ReactNode} from "react";
import {Provider} from "react-redux";
import {store} from "@store";

interface IPropType {
  children: ReactNode;
}

export const StoreProvider: FC<IPropType> = ({ children }) => {
  return (
    <Provider store={store} children={children} />
  );
};
