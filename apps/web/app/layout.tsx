export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, fontFamily: 'Inter, sans-serif', background: '#0b1020', color: '#e6e9f2' }}>{children}</body>
    </html>
  );
}
