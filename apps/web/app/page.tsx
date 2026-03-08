const cards = [
  'Tickets em atendimento',
  'SLA global',
  'Tempo médio de resposta',
  'Canal mais utilizado'
];

export default function DashboardPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Help Desk SaaS Omnichannel</h1>
      <p>Plataforma multiatendimento com IA semântica (Milvus + RAG).</p>
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 12 }}>
        {cards.map((card) => (
          <article key={card} style={{ background: '#141c35', borderRadius: 12, padding: 16 }}>
            <h3>{card}</h3>
            <strong>--</strong>
          </article>
        ))}
      </section>
    </main>
  );
}
