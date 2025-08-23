# Configuração do Google Ads - M&N Tecnologia

Este documento explica como configurar e usar o Google Ads integrado ao projeto de landing page.

## 🚀 Configuração Inicial

### 1. Configurar ID da Conta do Google Ads

Edite o arquivo `src/config/googleAds.ts` e atualize o `conversionId` com o ID da sua conta:

```typescript
export const googleAdsConfig: GoogleAdsConfig = {
  conversionId: 'SEU_ID_AQUI', // Substitua pelo seu ID real
  conversionLabel: 'lead_form',
  // ... outras configurações
};
```

### 2. Configurar Labels de Conversão

No Google Ads, crie as seguintes ações de conversão:

- **contact_form_submit**: Formulário de contato enviado
- **contact_button_click**: Clique no botão "Fale Conosco"
- **start_now_button_click**: Clique no botão "Começar Agora"
- **whatsapp_click**: Clique no WhatsApp
- **quote_form_submit**: Formulário de orçamento enviado

## 📊 Rastreamento Automático

### Botões e Links

Os seguintes elementos são rastreados automaticamente:

- ✅ Botão "Fale Conosco" (Header)
- ✅ Botão "Começar Agora" (Header)
- ✅ Formulário de contato (ContactSection)
- ✅ Botão flutuante do WhatsApp
- ✅ WhatsApp via formulário

### Eventos Rastreados

| Evento | Descrição | Valor |
|--------|-----------|-------|
| `contact_button_click` | Clique no botão de contato | R$ 5,00 |
| `start_now_button_click` | Clique no botão principal | R$ 20,00 |
| `contact_form_submit` | Envio do formulário | R$ 10,00 |
| `whatsapp_click` | Clique no WhatsApp | R$ 3,00 |

## 🛠️ Uso no Código

### Hook useGoogleAds

```typescript
import { useGoogleAds } from '@/hooks/useGoogleAds';

const MyComponent = () => {
  const { 
    trackContactForm, 
    trackButtonClick, 
    trackCustomEvent 
  } = useGoogleAds();

  const handleSubmit = () => {
    trackContactForm(); // Rastreia conversão
    trackCustomEvent('custom_action', { value: 100 });
  };
};
```

### Rastreamento Manual

```typescript
// Rastrear conversão
window.trackGoogleAdsConversion(1000); // R$ 10,00

// Rastrear clique em botão
window.trackGoogleAdsButtonClick('meu_botao', 500);

// Rastrear envio de formulário
window.trackGoogleAdsFormSubmit('meu_formulario', 1500);
```

## 🔧 Configurações Avançadas

### Habilitar/Desabilitar Recursos

```typescript
export const googleAdsConfig: GoogleAdsConfig = {
  conversionId: 'SEU_ID',
  enableConversionTracking: true,    // Rastreamento de conversões
  enableButtonTracking: true,        // Rastreamento de botões
  enableFormTracking: true,          // Rastreamento de formulários
  enablePageViewTracking: true,      // Rastreamento de visualizações
};
```

### Eventos Personalizados

```typescript
// Rastrear tempo na página
trackTimeOnPage(120); // 2 minutos

// Rastrear profundidade de scroll
trackScrollDepth(75); // 75% da página

// Evento customizado
trackCustomEvent('download_completed', {
  file_name: 'ebook.pdf',
  file_size: '2.5MB'
});
```

## 📱 Rastreamento Mobile

O Google Ads funciona automaticamente em dispositivos móveis e desktop. Todos os eventos são rastreados independentemente do dispositivo.

## 🧪 Testando a Integração

### 1. Verificar Console do Navegador

Abra o DevTools e verifique se não há erros relacionados ao Google Ads.

### 2. Verificar dataLayer

```javascript
// No console do navegador
console.log(window.dataLayer);
```

### 3. Testar Eventos

- Clique nos botões do header
- Envie o formulário de contato
- Clique no WhatsApp
- Verifique se os eventos aparecem no dataLayer

## 🚨 Troubleshooting

### Script não carrega

- Verifique se o `conversionId` está correto
- Confirme se não há bloqueadores de anúncios ativos
- Verifique a conexão com a internet

### Eventos não aparecem

- Verifique se o componente `GoogleAds` está renderizado
- Confirme se as funções estão sendo chamadas
- Verifique o console para erros JavaScript

### Conversões não registram

- Verifique se o `conversionLabel` está configurado no Google Ads
- Confirme se a conta do Google Ads está ativa
- Aguarde até 24h para aparecer no relatório

## 📈 Relatórios no Google Ads

### Conversões

Acesse: **Ferramentas e configurações > Medições > Conversões**

### Relatórios de Performance

- **Campanhas > Relatórios**
- **Audience > Relatórios**
- **Ferramentas > Relatórios personalizados**

## 🔒 Privacidade e LGPD

- O rastreamento respeita as configurações de privacidade do usuário
- Dados são enviados apenas para o Google Ads
- Não armazenamos informações pessoais localmente

## 📞 Suporte

Para dúvidas sobre a integração técnica, consulte a documentação do Google Ads ou entre em contato com a equipe de desenvolvimento.

---

**Última atualização**: Dezembro 2024  
**Versão**: 1.0.0
