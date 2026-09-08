/**
 * Horizonte Novo Empreendimentos e Participacoes Ltda - Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');

  if (mobileBtn && mobileNav) {
    mobileBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      if (mobileNav.classList.contains('open')) {
        mobileBtn.setAttribute('aria-expanded', 'true');
      } else {
        mobileBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu when clicking link
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
      });
    });
  }

  // 2. Navbar scroll state
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // 3. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close other items
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          const btn = otherItem.querySelector('.faq-question');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });

        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // 4. Quick Form Handler
  const quoteForm = document.getElementById('quoteForm');
  const toast = document.getElementById('toastNotification');

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('quoteName') ? document.getElementById('quoteName').value.trim() : '';
      const type = document.getElementById('quoteType') ? document.getElementById('quoteType').value : '';
      const phone = document.getElementById('quotePhone') ? document.getElementById('quotePhone').value.trim() : '';
      const msgDetails = document.getElementById('quoteMessage') ? document.getElementById('quoteMessage').value.trim() : '';

      // Formatar mensagem para WhatsApp
      const message = `Olá, Novo Horizonte Materiais para Construção LTDA! Gostaria de um orçamento:\n` +
                      `👤 *Nome/Empresa:* ${name}\n` +
                      `🧱 *Linha de Produto/Serviço:* ${type}\n` +
                      `📱 *Contato:* ${phone}\n` +
                      `💬 *Detalhes:* ${msgDetails || 'Nenhum detalhe informado'}`;

      const encodedMsg = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/5511999999999?text=${encodedMsg}`;

      // Exibir Toast Feedback
      showToast('✅ Solicitação enviada! Redirecionando para as vendas...');

      // Abrir WhatsApp após 1.2 segundos
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 1200);
    });
  }

  // Toast Function
  function showToast(text) {
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }
});
