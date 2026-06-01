const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const SYSTEM_PROMPT = `You are Evie, an AI customer service assistant for Everform Therapywear (everformwear.com.au) — an Australian brand specialising in physio-designed compression and supportwear for women.

IMPORTANT: Always introduce yourself as an AI assistant in your first response. For example: "Hi [name], I'm Evie, Everform's AI customer service assistant. I'm here to help!"

Your personality: warm, positive, solution-focused and concise. Get to the point — customers are busy. Never use apologetic language like "I'm so sorry" — instead be positive and solution-focused.

RESPONSE STYLE — CRITICAL:
- Keep responses SHORT and TO THE POINT — 2-3 sentences maximum unless detail is genuinely needed
- Never be long winded
- Be warm but efficient
- Use macros as your primary template whenever one is relevant — personalise lightly
- Never apologise unnecessarily — be positive and solution-focused
- NEVER direct customers to hello@everformwear.com — always direct to Christine at christine@everformwear.com or escalate directly

IMPORTANT - LINKS IN RESPONSES:
When providing links, always format them as HTML anchor tags so they are clickable. For example: <a href="https://example.com" target="_blank">click here</a>. Always use descriptive link text, never show raw URLs.

ESCALATION RULES — CRITICAL:
The following situations must ALWAYS be escalated to Christine. Respond warmly and let the customer know Christine will personally follow up:
- Weekdays: "Our customer service manager Christine will personally follow up with you within 24 hours."
- Weekends: "Our customer service manager Christine will personally follow up with you within 48 hours."

ALWAYS ESCALATE TO CHRISTINE:
1. Refund requests where customer insists after Evie's first response
2. Faulty or damaged items
3. Sizing enquiries where customer is still unhappy after Evie's first response
4. Pre-order queries about briefs — use Briefs on Pre-Order macro then escalate
5. Policy exception requests
6. Final Sale disputes
7. Affiliate or wholesale enquiries
8. Promotional code issues
9. Anything Evie cannot fully resolve

NEVER say "email our team" or reference hello@everformwear.com — Christine will follow up directly via this ticket. The ONLY email address Evie should ever reference is christine@everformwear.com and only when absolutely necessary.

STORE:
- Website: everformwear.com.au
- Christine (Customer Service Manager): christine@everformwear.com
- Products: Compression shorts, leggings, underwear (Pro Support Brief, LBL Brief, Postpartum Brief), pregnancy support garments, therapeutic supportwear

PRE-ORDER UPDATE — CRITICAL:

BRIEFS (LBL Recovery Brief and Pro Support Brief):
- Currently experiencing freight delays — do NOT give a specific dispatch date
- Use the Briefs on Pre-Order macro as your template
- Always escalate to Christine after sending response
- Be warm and empathetic but positive — focus on options available

SHORTS AND OTHER PRODUCTS:
- Shipment has landed in Australia
- Dispatching 6th May 2026
- Respond: "Great news — your order has landed in Australia and is due to be dispatched on 6th May 2026. You will receive a tracking email as soon as it is on its way!"

MIXED ORDERS (briefs + other items):
- Other items dispatch 6th May 2026
- Briefs subject to further delays — escalate to Christine

ORDER TRACKING (non pre-order):
- Processing time is 3-5 business days (excluding weekends)
- Orders placed before 1pm prioritised for same-day processing
- Once shipped customers receive tracking link via email
- Direct them to: <a href="https://everformwear.com.au/apps/aftership" target="_blank">Track your order</a>
- If customer provides order number Evie will look up their order directly

SHOPIFY ORDER LOOKUP:
- When a customer asks about their order status or tracking, ask for their order number and email address
- Use these to look up their real order details from Shopify
- Provide their actual fulfillment status and tracking link if available
- If order is not found, ask them to double check their order number and email
- If still not found escalate to Christine

RETURNS AND EXCHANGES — CORRECT FLOW:

EXCHANGES — EVIE HANDLES FULLY:
- Check eligibility: unworn, unwashed, tags attached, original packaging, within 30 days
- If eligible direct to: <a href="https://portal.refundid.com/stores/everform-therapywear" target="_blank">Start your exchange here</a>
- Postpartum Briefs and LBL: exchange or store credit only, must be unopened

REFUNDS — TWO STEP PROCESS:
- Step 1: Use the Refund Request macro — guide customer toward exchange or store credit first
- Step 2: If customer responds saying they still want a refund or are still unhappy — escalate to Christine
- Never promise or process refunds yourself

FAULTY ITEMS:
- Direct to Refundid portal: <a href="https://portal.refundid.com/stores/everform-therapywear" target="_blank">Submit your faulty item here</a>
- Ask for order number and clear photos of the fault
- Always escalate to Christine as well

RETURN CONDITIONS:
- In original as-new condition
- Unworn, unwashed and unaltered
- Tags, hygiene seals and packaging intact
- Free from marks, dust or odour
- Returned in original Everform box inside protective outer shipping box

ELIGIBILITY BY PURCHASE TYPE:

FULL-PRICED ITEMS:
- May be returned for refund, exchange or store credit within 30 days

SALE AND PROMOTIONAL PURCHASES:
- Refunds and exchanges NOT offered
- Store credit only

FINAL SALE ITEMS — CRITICAL:
- NOT eligible for return, exchange OR store credit under ANY circumstances
- Never direct to returns portal
- Respond with empathy and escalate to Christine

BUNDLE PURCHASES:
- Full refunds only when ALL items returned together
- Partial returns: refund adjusted minus proportional bundle discount

MOTHER'S DAY GIFTING (purchases between 21 April and 9 May 2026):
- Extended 45-day returns and exchanges window
- Standard return conditions still apply

SHIPPING:
- Standard and Express options available
- Free standard shipping on Australian orders over $180, $10 flat rate under $180, Express $15 (free Express over $200)
- International: free over $300 AUD; under $300 calculated by location, shipped with DHL
- Same day dispatch for orders placed before 1pm on business days
- Express: 1-2 business days, Standard: 2-8 business days within Australia

SIZING ENQUIRIES — CRITICAL — ALWAYS USE THIS EXACT RESPONSE:
When ANY customer asks about sizing, fit, measurements, or which size to choose, ALWAYS respond with this template (personalise the greeting only):

"Thanks so much for reaching out — great question and we're happy to help you find the perfect fit!

Compression wear is sized by your body measurements rather than standard clothing sizes, so we always recommend confirming your measurements before purchasing. As a general guide, if your measurements sit at the higher end of a size range and you prefer a less fitted feel, we'd suggest sizing up.

The most accurate way to find your size is our free 3D Verifyt body scan — it takes about 2 minutes on your phone and gives us your exact measurements so we can personally recommend the best size and level of support for you.

You can access the scan two ways:
- <a href="https://verifytsdkwidget.page.link/BB5w" target="_blank">Click here to start your scan</a>
- <a href="https://drive.google.com/open?id=15qTvHTPazebJ9oFVaFnU_VSM7Jwf6CQG&usp=drive_fs" target="_blank">Scan our Everform QR code</a>

How it works:
1. Open the link on your phone and download the app when prompted
2. Follow the guided steps to complete your scan
3. Once finished, open the same link again — this links your scan to our account

Prefer a different option? You're also welcome to:
- <a href="https://everformwear.com.au/pages/sizing" target="_blank">Self-measure using our sizing guide</a> (waist + hips)
- <a href="https://calendly.com/d/47n-rz5-hfr/fitting-consultation" target="_blank">Book an online fitting consultation</a> for personalised support

Once you have your measurements or Verifyt results, simply reply here and I'll review them and recommend the most suitable size for you.

Warm regards,
Evie
Everform AI Customer Assistant"

NEVER go straight to "book a fitting" — always offer Verifyt 3D scan as the PRIMARY first option.
NEVER skip the Verifyt option.
If the Gorgias Size Enquiry Info macro is available, use it as your template — it contains this same content.

FITTING CONSULTATION:
- Only offered as a SECONDARY option after Verifyt scan
- Book directly with Anna or Rosie: <a href="https://calendly.com/d/47n-rz5-hfr/fitting-consultation" target="_blank">Book a fitting session</a>

PROMOTIONAL CODES:
- May not apply if: product already discounted, another promotion active, code expired
- Escalate to Christine — never direct to hello@everformwear.com
- Respond: "Our customer service manager Christine will personally look into this for you and follow up within 24 hours (48 hours on weekends)."

HEALTH INSURANCE REBATES:
- All Everform products registered on TGA — eligible for health insurance rebates in Australia
- Rebate coverage varies by provider and plan
- ARTG numbers:
  * Pregnancy support garments: ARTG 370870
  * Postpartum recovery garments: ARTG 370871
  * Pro Support Brief: ARTG 370871
  * LBL Recovery Brief: ARTG 370871
- Medical prescription if needed: <a href="https://drive.google.com/file/d/1yzC8Fruk1AfeK8tzsIyjNXUtCNY_C8Ia/view?usp=drive_link" target="_blank">Download the prescription pad</a>

PRODUCT SYMPTOM GUIDE:
Pregnancy Support Garments (Legging, 8 inch Short, 5 inch Short):
- Suitable for: pelvic girdle pain, SIJ pain, symphysis pubis dysfunction, sciatica, low back pain, mild/moderate varicose veins, vulval varicosities, mild stress incontinence, mild bladder or uterine prolapse, pelvic congestion syndrome, swelling management

Postpartum Recovery Garments (Legging, 8 inch Short, 5 inch Short, Brief):
- Suitable for: pelvic girdle pain, SIJ pain, abdominal muscle separation, perineal tears and stitches, C-section and episiotomy wounds, sciatica, mild/moderate varicose veins, mild stress incontinence, mild bladder or uterine prolapse, pelvic congestion syndrome

Pelvic Floor Support Wear:
- LBL Brief: pelvic girdle pain, sciatica, low back pain, mild/moderate varicose veins, vulval varicosities, mild stress incontinence, pelvic congestion syndrome
- Pro Support Brief: pelvic girdle pain, sciatica, low back pain, mild/moderate varicose veins, vulval varicosities, mild bladder or uterine prolapse, pelvic congestion syndrome

AFFILIATES AND WHOLESALE:
- Escalate to Christine immediately
- "Our customer service manager Christine would love to help — she will follow up within 24 hours (48 hours on weekends)."
- Never direct to hello@everformwear.com

RULES:
- ALWAYS introduce yourself as AI in first response
- Keep replies SHORT — 2-3 sentences max EXCEPT for sizing responses which use the full template above
- Never invent order details or tracking numbers
- Never go straight to booking a fitting — always offer Verifyt first
- Always use macros when relevant — sizing macro takes priority for all fit questions
- Always format links as HTML anchor tags
- NEVER reference hello@everformwear.com — use christine@everformwear.com or escalate directly
- Never tell customers to email — Christine follows up directly through the ticket
- Always give escalation timeframe: 24hrs weekdays, 48hrs weekends
- Tag every ticket Evie responds to with evie-replied

GORGIAS EMAIL REPLIES:
Write in plain warm professional English. Use macros as primary templates:
- Refund requests → Refund Request macro
- Sizing queries → Size Enquiry Info macro (contains Verifyt as primary option)
- Briefs pre-order → Briefs on Pre-Order macro
Replace {{customer.first_name}} with actual customer name. Sign off with:
"Warm regards,
Evie
Everform AI Customer Assistant"`;

// Auto-reply, marketing and non-customer email detection
function shouldSkip(subject, body, senderEmail) {
  var autoReplyPatterns = [
    /out of office/i,
    /out-of-office/i,
    /auto.?reply/i,
    /automatic.?reply/i,
    /automated.?reply/i,
    /away from (the )?office/i,
    /on leave/i,
    /on vacation/i,
    /annual leave/i,
    /maternity leave/i,
    /currently away/i,
    /currently out/i,
    /i am away/i,
    /i will be (out|away|unavailable)/i,
    /do not reply/i,
    /do-not-reply/i,
    /noreply/i,
    /no-reply/i,
    /this is an automated/i,
    /this email was sent automatically/i,
    /please do not respond/i,
    /delivery (status )?notification/i,
    /mail delivery failed/i,
    /returned mail/i,
    /unsubscribe/i,
    /review notification/i,
    /left a review/i,
    /new review/i,
    /star review/i,
    /submitted a review/i,
    /judge\.me/i,
    /yotpo/i,
    /okendo/i,
    /stamped\.io/i,
    /klaviyo/i,
    /mailchimp/i,
    /campaign monitor/i,
    /omnisend/i,
    /notification/i
  ];

  var nonCustomerPatterns = [
    /partnership/i,
    /collaboration/i,
    /influencer/i,
    /ambassador/i,
    /press release/i,
    /media enquiry/i,
    /marketing proposal/i,
    /advertising opportunity/i,
    /sponsored/i,
    /brand deal/i,
    /pr opportunity/i,
    /campaign proposal/i,
    /link building/i,
    /seo (services|proposal|offer)/i,
    /guest post/i,
    /content marketing/i,
    /digital marketing (agency|services)/i,
    /we (can help|specialise|offer)/i,
    /our (agency|company|team) (can|offers|provides|specialises)/i,
    /commission (payment|notification)/i,
    /supplier/i,
    /bulk order/i,
    /trade (inquiry|enquiry|account)/i
  ];

  var combined = (subject || '') + ' ' + (body || '') + ' ' + (senderEmail || '');

  if (autoReplyPatterns.some(function(p) { return p.test(combined); })) {
    return { skip: true, reason: 'auto-reply' };
  }

  if (nonCustomerPatterns.some(function(p) { return p.test(combined); })) {
    return { skip: true, reason: 'non-customer' };
  }

  if (senderEmail) {
    var skipDomains = ['noreply', 'no-reply', 'donotreply', 'do-not-reply', 'notifications', 'mailer-daemon', 'judge.me', 'klaviyo', 'mailchimp'];
    var emailLower = senderEmail.toLowerCase();
    if (skipDomains.some(function(d) { return emailLower.includes(d); })) {
      return { skip: true, reason: 'no-reply sender' };
    }
  }

  return { skip: false };
}

// Shopify order lookup
async function lookupOrder(orderNumber, customerEmail) {
  try {
    var cleanOrder = orderNumber.replace('#', '').trim();
    var url = 'https://lennyroseactive.myshopify.com/admin/api/2024-01/orders.json?name=' + encodeURIComponent(cleanOrder) + '&status=any';
    var response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Shopify-Access-Token': process.env.SHOPIFY_API_TOKEN,
        'Content-Type': 'application/json'
      }
    });
    var data = await response.json();
    var orders = data.orders || [];

    if (customerEmail && orders.length > 0) {
      var filtered = orders.filter(function(o) {
        return o.email && o.email.toLowerCase() === customerEmail.toLowerCase();
      });
      if (filtered.length > 0) orders = filtered;
    }

    if (orders.length === 0) return null;

    var order = orders[0];
    var fulfillment = order.fulfillments && order.fulfillments[0];
    var trackingNumber = fulfillment ? fulfillment.tracking_number : null;
    var trackingUrl = fulfillment ? fulfillment.tracking_url : null;

    return {
      orderNumber: order.name,
      fulfillmentStatus: order.fulfillment_status || 'unfulfilled',
      financialStatus: order.financial_status,
      trackingNumber: trackingNumber,
      trackingUrl: trackingUrl,
      createdAt: order.created_at,
      lineItems: order.line_items ? order.line_items.map(function(i) { return i.title; }) : []
    };
  } catch (err) {
    console.error('Order lookup error:', err);
    return null;
  }
}

app.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Missing messages' });
    }
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 800,
        system: SYSTEM_PROMPT,
        messages: messages
      })
    });
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data });
    const reply = data.content && data.content[0] ? data.content[0].text : '';
    res.json({ reply });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/gorgias-webhook', async (req, res) => {
  const ticket_id = String(req.body.ticket_id || '');
  if (!ticket_id || ticket_id === 'undefined') {
    return res.status(400).json({ error: 'Missing ticket_id' });
  }
  res.json({ success: true, ticket_id: ticket_id });
  processTicket(ticket_id).catch(function(err) {
    console.error('Background processing error for ticket ' + ticket_id + ':', err);
  });
});

async function processTicket(ticket_id) {
  try {
    const gorgiasAuth = 'Basic ' + Buffer.from(
      process.env.GORGIAS_EMAIL + ':' + process.env.GORGIAS_API_KEY
    ).toString('base64');

    // Fetch ticket
    const ticketResponse = await fetch(
      'https://everformwear.gorgias.com/api/tickets/' + ticket_id,
      { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': gorgiasAuth } }
    );
    const ticket = await ticketResponse.json();
    if (!ticketResponse.ok) {
      console.error('Failed to fetch ticket:', ticket);
      return;
    }

    // Fetch messages
    const messagesResponse = await fetch(
      'https://everformwear.gorgias.com/api/tickets/' + ticket_id + '/messages',
      { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': gorgiasAuth } }
    );
    const messagesData = await messagesResponse.json();
    const allMessages = messagesData.data || [];

    // Skip if human agent has already replied
    const agentReplied = allMessages.some(function(m) {
      return m.from_agent === true && m.via !== 'api';
    });
    if (agentReplied) {
      console.log('Skipping ticket ' + ticket_id + ' — agent has already replied');
      return;
    }

    // Find customer message
    const customerMsg = allMessages.find(function(m) {
      return m.from_agent === false || m.from_agent === null || m.from_agent === undefined;
    });
    const allText = allMessages.map(function(m) {
      return (m.body_text || m.body_html || '');
    }).join(' ');
    const customerMessage = customerMsg
      ? (customerMsg.body_text || customerMsg.body_html || allText)
      : allText;

    const ticketSubject = ticket.subject || '';
    const customerName = ticket.customer ? (ticket.customer.name || 'there') : 'there';
    const customerFirstName = customerName.split(' ')[0];
    const customerEmail = ticket.customer ? (ticket.customer.email || '') : '';

    if (!customerMessage || customerMessage.trim() === '') {
      console.log('No customer message found for ticket ' + ticket_id);
      return;
    }

    // Skip auto-replies and non-customer emails
    var skipCheck = shouldSkip(ticketSubject, customerMessage, customerEmail);
    if (skipCheck.skip) {
      console.log('Skipping ticket ' + ticket_id + ' — reason: ' + skipCheck.reason);
      if (skipCheck.reason === 'non-customer') {
        await fetch(
          'https://everformwear.gorgias.com/api/tickets/' + ticket_id,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': gorgiasAuth },
            body: JSON.stringify({ tags: [{ name: 'Christine-Review' }] })
          }
        );
      }
      return;
    }

    // Check for existing threads under same email
    var existingThreadContext = '';
    if (customerEmail) {
      try {
        var existingResponse = await fetch(
          'https://everformwear.gorgias.com/api/tickets?customer_email=' + encodeURIComponent(customerEmail) + '&limit=5',
          { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': gorgiasAuth } }
        );
        var existingData = await existingResponse.json();
        var existingTickets = existingData.data || [];
        var otherTickets = existingTickets.filter(function(t) {
          return String(t.id) !== String(ticket_id);
        });
        if (otherTickets.length > 0) {
          existingThreadContext = 'NOTE: This customer has ' + otherTickets.length + ' other ticket(s) in the system. Most recent subject: "' + (otherTickets[0].subject || 'unknown') + '". Take this into account when responding.\n\n';
        }
      } catch (err) {
        console.log('Could not fetch existing threads:', err);
      }
    }

    // Check for order number and look up if found
    var orderContext = '';
    var orderMatch = customerMessage.match(/#?(\d{4,6})/);
    if (orderMatch && process.env.SHOPIFY_API_TOKEN) {
      var orderData = await lookupOrder(orderMatch[0], customerEmail);
      if (orderData) {
        orderContext = 'SHOPIFY ORDER DATA for ' + orderData.orderNumber + ':\n';
        orderContext += '- Status: ' + orderData.fulfillmentStatus + '\n';
        orderContext += '- Payment: ' + orderData.financialStatus + '\n';
        orderContext += '- Items: ' + orderData.lineItems.join(', ') + '\n';
        if (orderData.trackingNumber) orderContext += '- Tracking number: ' + orderData.trackingNumber + '\n';
        if (orderData.trackingUrl) orderContext += '- Tracking URL: ' + orderData.trackingUrl + '\n';
        orderContext += '\n';
      }
    }

    // Determine if escalation needed
    const isWeekend = [0, 6].indexOf(new Date().getDay()) !== -1;
    const followUpTime = isWeekend ? '48 hours' : '24 hours';

    const needsEscalation =
      /faulty|damaged|defect|broken|wrong.item/i.test(customerMessage) ||
      /final.sale|policy.exception/i.test(customerMessage) ||
      /brief|lbl|pro support/i.test(customerMessage) ||
      /pre.order|preorder/i.test(customerMessage) ||
      /affiliate|wholesale|partner|collaborat/i.test(customerMessage) ||
      /promo.?code|discount.code|voucher/i.test(customerMessage);

    // Detect sizing query specifically
    const isSizingQuery = /size|sizing|fit|too tight|too small|too big|too large|measurements|measure|which size|what size/i.test(customerMessage);

    // Tag ticket
    var tags = [{ name: 'evie-replied' }];
    if (needsEscalation) tags.push({ name: 'Escalation' });

    await fetch(
      'https://everformwear.gorgias.com/api/tickets/' + ticket_id,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': gorgiasAuth },
        body: JSON.stringify({ tags: tags })
      }
    );

    // Fetch macros
    const macrosResponse = await fetch(
      'https://everformwear.gorgias.com/api/macros?limit=50',
      { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': gorgiasAuth } }
    );
    const macrosData = await macrosResponse.json();
    const macros = macrosData.data || [];

    // Find specific macros
    const briefsMacro = macros.find(function(m) { return m.name && /briefs on pre.order/i.test(m.name); });
    const refundMacro = macros.find(function(m) { return m.name && /refund.request/i.test(m.name); });
    const sizeMacro = macros.find(function(m) { return m.name && /size enquiry/i.test(m.name); });

    // Determine which macro to use
    var selectedMacro = null;
    var isBriefsQuery = /brief|lbl|pro support/i.test(customerMessage);
    var isRefundQuery = /refund|money back|reimburse/i.test(customerMessage);

    if (isBriefsQuery && briefsMacro) selectedMacro = briefsMacro;
    else if (isRefundQuery && refundMacro) selectedMacro = refundMacro;
    else if (isSizingQuery && sizeMacro) selectedMacro = sizeMacro;

    // Build macro context
    var macroContext = '';
    if (isSizingQuery && sizeMacro) {
      macroContext = 'CRITICAL: This is a sizing enquiry. You MUST use this exact macro as your response template — do not deviate. Replace {{customer.first_name}} with ' + customerFirstName + ':\n\n--- MACRO: Size Enquiry Info ---\n' + (sizeMacro.body_text || sizeMacro.body_html || '') + '\n\nIMPORTANT: Always offer the Verifyt 3D body scan as the PRIMARY first option. Never go straight to booking a fitting.\n\n';
    } else if (selectedMacro) {
      macroContext = 'USE THIS MACRO AS YOUR TEMPLATE — personalise lightly, replace {{customer.first_name}} with ' + customerFirstName + ':\n\n--- MACRO: ' + selectedMacro.name + ' ---\n' + (selectedMacro.body_text || selectedMacro.body_html || '') + '\n\n';
    } else if (macros.length > 0) {
      macroContext = 'AVAILABLE MACROS (use most relevant as template, replace {{customer.first_name}} with ' + customerFirstName + '):\n\n';
      macros.forEach(function(macro) {
        if (macro.body_html || macro.body_text) {
          macroContext += '--- MACRO: ' + macro.name + ' ---\n';
          macroContext += (macro.body_text || macro.body_html || '') + '\n\n';
        }
      });
    }

    // Build escalation note
    var escalationNote = '';
    if (needsEscalation) {
      escalationNote = '\n\nNOTE: This ticket needs escalation. Tell the customer Christine will personally follow up within ' + followUpTime + '. Do NOT reference hello@everformwear.com — Christine will reach out directly through this ticket.';
    }

    // Ask Claude to draft reply
    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: existingThreadContext + orderContext + macroContext + 'Draft a reply to this customer email. Customer name: ' + customerFirstName + '. Their message: ' + customerMessage + escalationNote
          }
        ]
      })
    });

    const claudeData = await claudeResponse.json();
    const draftReply = claudeData.content && claudeData.content[0] ? claudeData.content[0].text : '';

    if (!draftReply) {
      console.error('No reply generated for ticket ' + ticket_id);
      return;
    }

    // Post reply to Gorgias
    const draftResponse = await fetch(
      'https://everformwear.gorgias.com/api/tickets/' + ticket_id + '/messages',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': gorgiasAuth },
        body: JSON.stringify({
          body_html: draftReply.replace(/\n/g, '<br>'),
          body_text: draftReply,
          channel: 'email',
          from_agent: true,
          via: 'api',
          sender: { email: 'hello@everformwear.com' },
          source: {
            from: { address: 'hello@everformwear.com' },
            to: [{ address: customerEmail }]
          }
        })
      }
    );

    const draftData = await draftResponse.json();
    if (!draftResponse.ok) {
      console.error('Gorgias reply error:', JSON.stringify(draftData));
    } else {
      console.log('Reply sent for ticket ' + ticket_id);
    }

  } catch (err) {
    console.error('processTicket error for ' + ticket_id + ':', err);
  }
}

app.get('/', function(req, res) { res.send('Evie server is running'); });

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() { console.log('Evie server running on port ' + PORT); });
