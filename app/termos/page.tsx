import { PageHeader } from "@/components/layout/PageHeader";

export default function TermosPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col gap-6 px-4 py-8">
      <PageHeader title="Termos de Uso" />

      <div className="flex flex-col gap-5 text-sm leading-relaxed text-neutral-300">
        <p className="rounded-2xl border border-amber-800 bg-amber-950/30 p-4 text-xs text-amber-200">
          Este documento é um modelo inicial, ainda não revisado por um advogado.
          Atualize os campos entre colchetes e valide o conteúdo antes de considerar
          oficial.
        </p>

        <p className="text-xs text-neutral-500">Última atualização: 21 de agosto de 2026</p>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-neutral-100">1. Sobre o Calculex</h2>
          <p>
            O Calculex é um aplicativo de utilidades (calculadora, calculadora
            científica, conversores e medidor de BPM), oferecido por Leonardo
            Araújo da Silva, CPF 464.422.888-54, com contato em
            leonegocios.ads@gmail.com.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-neutral-100">2. Plano gratuito e Premium</h2>
          <p>
            O Calculex oferece um plano gratuito (Free), com acesso à calculadora
            básica, conversores e medidor de BPM, e um plano pago (Premium), que
            adiciona a Calculadora Científica e outros recursos que venham a ser
            lançados.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-neutral-100">3. Assinatura Premium</h2>
          <p>
            O plano Premium custa R$ 9,90 (nove reais e noventa centavos) por mês,
            cobrado de forma recorrente e automática, processado pelo Mercado Pago.
            Ao assinar, você autoriza a cobrança mensal até que a assinatura seja
            cancelada.
          </p>
          <p>
            Você pode cancelar a renovação automática a qualquer momento, na tela
            &quot;Minha conta&quot; dentro do app. Após o cancelamento, o acesso Premium
            continua disponível até o fim do período que já foi pago — não há
            corte imediato, e nenhuma cobrança futura é feita.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-neutral-100">
            4. Direito de arrependimento e reembolso
          </h2>
          <p>
            Conforme o Código de Defesa do Consumidor (art. 49), você tem até 7
            (sete) dias corridos após a contratação para desistir da assinatura e
            solicitar reembolso integral, sem necessidade de justificativa, entrando
            em contato pelo e-mail leonegocios.ads@gmail.com. Após esse prazo, cobranças já
            realizadas não são reembolsáveis, mas o cancelamento futuro continua
            livre e gratuito, a qualquer momento.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-neutral-100">5. Pagamentos</h2>
          <p>
            Os pagamentos são processados inteiramente pelo Mercado Pago. O Calculex
            não recebe nem armazena dados do seu cartão ou conta bancária — essas
            informações ficam exclusivamente com o Mercado Pago, sujeitas aos
            próprios termos e políticas de privacidade deles.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-neutral-100">6. Conta e uso aceitável</h2>
          <p>
            Você é responsável por manter a confidencialidade da sua senha. É
            proibido usar o Calculex para fins ilegais ou tentar acessar recursos
            Premium sem uma assinatura ativa. Contas usadas de forma abusiva podem
            ser suspensas.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-neutral-100">7. Alterações</h2>
          <p>
            Estes termos podem ser atualizados a qualquer momento. Mudanças
            relevantes serão comunicadas dentro do app. O uso contínuo após uma
            atualização significa que você concorda com os novos termos.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-neutral-100">8. Contato</h2>
          <p>
            Dúvidas sobre estes termos podem ser enviadas para leonegocios.ads@gmail.com.
          </p>
        </section>
      </div>
    </main>
  );
}
