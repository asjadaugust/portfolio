import PortfolioNav from '@/components/PortfolioNav/PortfolioNav';

export default function RestaurantPOSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="restaurant-pos-app">
      {children}
      <PortfolioNav />
    </div>
  );
}
