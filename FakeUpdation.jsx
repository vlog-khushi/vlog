import React, { useEffect, useState } from 'react';
import { formateCoinPrice } from '../../utils/common/formateNumber';

const FakeUpdation = ({ price }) => {
  const [fakePrice, setFakePrice] = useState(price);
  const [color, setColor] = useState("");

  useEffect(() => {
    setFakePrice(formateCoinPrice(price));
    const randomTime = Math.floor(Math.random() * (10000 - 6000 + 1)) + 6000;
    const interval = setInterval(() => {
      let randomChange;

      if (price && price > 15000) {
        randomChange = (Math.random() * 0.00015) - 0.0001;
      } else if (price && price > 1000) {
        randomChange = (Math.random() * 0.0015) - 0.001;
      } else if (price && price > 100) {
        randomChange = (Math.random() * 0.015) - 0.01;
      }

      if (randomChange !== undefined) {
        if (randomChange < 0) {
          setColor("red");
        } else if (randomChange > 0) {
          setColor("green");
        }

        const newPrice = price * (1 + randomChange);
        setFakePrice(formateCoinPrice(newPrice));

        const randomInterval = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
        setTimeout(() => {
          setColor("");
        }, randomInterval);
      }
    }, randomTime);

    return () => clearInterval(interval);
  }, [price]);

  return (
    <div
      style={{
        color: color,
        transition: "color 0.1s ease-in, color 0.8s ease-out",
      }}
    >
      ${fakePrice}
    </div>
  );
};

export default FakeUpdation;
