import { useTonAddress } from "@tonconnect/ui-react";

export const AddressInfo = () => {
  const address = useTonAddress();

  if (!address) {
    return null;
  }

  return (
    <div className="address-info">
      <div>Address: {address}</div>
    </div>
  );
};
