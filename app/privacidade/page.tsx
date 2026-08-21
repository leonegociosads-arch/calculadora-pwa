import { PageHeader } from "@/components/layout/PageHeader";

export default function PrivacidadePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col gap-6 px-4 py-8">
      <PageHeader title="Política de Privacidade" />

      <div className="flex flex-col gap-5 text-sm leading-relaxed text-neutral-300">
        <p className="rounded-2xl border border-amber-800 bg-amber-950/30 p-4 text-xs text-amber-200">
          Este documento é um modelo inicial, ainda não revisado por um advogado.
          Atualize os campos entre colchetes e valide o conteúdo antes de considerar
          oficial.
        </p>

        <p className="text-xs text-neutral-500">Última atualização: 21 de agosto de 2026</p>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-neutral-100">1. Quem somos</h2>
          <p>
            Esta política explica como o Calculex, oferecido por Leonardo
            Araújo da Silva, CPF 464.422.888-54, trata os dados pessoais de
            quem usa o aplicativo, em conformidade com a Lei Geral de Proteção
            de Dados (LGPD).
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-neutral-100">2. Quais dados coletamos</h2>
          <ul className="flex list-disc flex-col gap-1 pl-5">
            <li>E-mail e senha (a senha nunca é armazenada em texto puro)</li>
            <li>Data de criação da conta</li>
            <li>Status do plano (Free ou Premium) e status da assinatura</li>
            <li>
              Um identificador da sua assinatura no Mercado Pago (não incluímos
              dados de cartão — isso fica só com o Mercado Pago)
            </li>
          </ul>
          <p>
            Não coletamos dados sensíveis nem mais informações do que o necessário
            para o funcionamento do app e da assinatura Premium.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-neutral-100">
            3. Para que usamos esses dados
          </h2>
          <ul className="flex list-disc flex-col gap-1 pl-5">
            <li>Autenticar seu login e manter sua sessão</li>
            <li>Liberar ou bloquear recursos Premium corretamente</li>
            <li>Processar e confirmar sua assinatura junto ao Mercado Pago</li>
            <li>Comunicar mudanças importantes na sua conta</li>
          </ul>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-neutral-100">
            4. Com quem compartilhamos
          </h2>
          <p>Usamos os seguintes prestadores de serviço para operar o Calculex:</p>
          <ul className="flex list-disc flex-col gap-1 pl-5">
            <li>
              <strong className="text-neutral-100">Supabase</strong> — autenticação e
              banco de dados
            </li>
            <li>
              <strong className="text-neutral-100">Mercado Pago</strong> —
              processamento de pagamentos e dados da assinatura
            </li>
            <li>
              <strong className="text-neutral-100">Vercel</strong> — hospedagem do
              aplicativo
            </li>
          </ul>
          <p>
            Não vendemos nem compartilhamos seus dados com terceiros para fins de
            publicidade.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-neutral-100">
            5. Seus direitos (LGPD)
          </h2>
          <p>Você pode, a qualquer momento, solicitar:</p>
          <ul className="flex list-disc flex-col gap-1 pl-5">
            <li>Acesso aos dados que temos sobre você</li>
            <li>Correção de dados incorretos</li>
            <li>Exclusão da sua conta e dos seus dados</li>
            <li>Informações sobre com quem seus dados são compartilhados</li>
          </ul>
          <p>
            Para exercer qualquer um desses direitos, entre em contato pelo e-mail
            leonegocios.ads@gmail.com.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-neutral-100">6. Cookies e sessão</h2>
          <p>
            Usamos cookies estritamente necessários para manter você logado — não
            usamos cookies de rastreamento ou publicidade.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-neutral-100">
            7. Retenção e exclusão
          </h2>
          <p>
            Seus dados ficam armazenados enquanto sua conta existir. Ao solicitar a
            exclusão da conta, seus dados pessoais são removidos, exceto quando a
            lei exigir retenção (por exemplo, registros fiscais de pagamentos).
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-neutral-100">8. Contato</h2>
          <p>
            Dúvidas sobre privacidade podem ser enviadas para leonegocios.ads@gmail.com.
          </p>
        </section>
      </div>
    </main>
  );
}
