export interface Auction {
  id: number;
  title: string;
  bid: string;
  time: string;
  image: string;
  category: string;
  endTime: Date;
}

export const getAuctions = () => {
  const existingAuctions = localStorage.getItem('auctions');
  if (!existingAuctions) return [];
  
  const auctions = JSON.parse(existingAuctions);
  return auctions.map((auction: any) => ({
    ...auction,
    endTime: new Date(auction.endTime)
  }));
};

export const saveNewAuction = (item: any) => {
  const newAuction: Auction = {
    id: Date.now(),
    title: item.title,
    bid: item.price,
    time: "24h",
    image: item.image || "pics/default.jpeg",
    category: "Miscellaneous",
    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000) // Add 24 hours from now
  };

  const auctions = getAuctions();
  auctions.push(newAuction);
  localStorage.setItem('auctions', JSON.stringify(auctions));
  
  return newAuction;
};
