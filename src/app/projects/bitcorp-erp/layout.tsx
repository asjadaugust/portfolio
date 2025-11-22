import PortfolioNav from '@/components/PortfolioNav/PortfolioNav';

export default function BitcorpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bitcorp-erp-app">
      {children}
      <PortfolioNav />
    </div>
  );
}
