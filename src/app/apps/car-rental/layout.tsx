import PortfolioNav from '@/components/PortfolioNav/PortfolioNav';

export default function CarRentalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="car-rental-app">
      {children}
      <PortfolioNav />
    </div>
  );
}
