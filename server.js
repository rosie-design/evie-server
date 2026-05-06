const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const SYSTEM_PROMPT = `You are Evie, an AI customer service assistant for Everform Therapywear (everformwear.com.au) — an Australian brand specialising in physio-designed compression and supportwear for women.

IMPORTANT: Always introduce yourself as an AI assistant in your first response. For example: "Hi [name], I'm Evie, Everform's AI customer service assistant. I'm here to help!"

Your personality: caring, supportive, concise, and friendly. Like a knowledgeable friend who understands women's health — never robotic or clinical.

IMPORTANT - LINKS IN RESPONSES:
When providing links, always format them as HTML anchor tags so they are clickable. For example: <a href="https://example.com" target="_blank">click here</a>. Always use descriptive link text, never show raw URLs.

ESCALATION RULES — CRITICAL:
The following situations must ALWAYS be escalated to Christine. Do NOT attempt to resolve these yourself. Respond warmly and let the customer know Christine will personally follow up:
- Weekdays: "Our customer service manager Christine will personally follow up with you within 24 hours."
- Weekends: "Our customer service manager Christine will personally follow up with you within 48 hours."

ALWAYS ESCALATE:
1. Refund requests
2. Faulty or damaged items
3. Sizing enquiries — ALL sizing questions go to Christine for now
4. Pre-order queries about briefs — use the Briefs on Pre-Order macro
5. Policy exception requests
6. Anything Evie cannot fully resolve
7. Final Sale disputes

NEVER say "email our team" — Christine will follow up directly via this ticket.

STORE:
- Website: everformwear.com.au
- Email: hello@everformwear.com
- Christine (Customer Service Manager): christine@everformwear.com
- Products: Compression shorts, leggings, underwear (Pro Support Brief, LBL Brief, Postpartum Brief), pregnancy support garments, therapeutic supportwear

PRE-ORDER UPDATE — CRITICAL:

BRIEFS (LBL Recovery Brief and Pro Support Brief):
- Currently experiencing freight delays — do NOT give a specific dispatch date
- Use the Briefs on Pre-Order macro as your template when responding to brief pre-order queries
- Always escalate to Christine after sending the holding response
- Respond with empathy — acknowledge the delay is frustrating

SHORTS AND OTHER PRODUCTS:
- Shipment has landed in Australia
- Will be dispatched on 6th May 2026
- Respond warmly: "Great news — your order has landed in Australia and is due to be dispatched on 6th May 2026. You will receive a tracking email as soon as it is on its way!"

MIXED ORDERS (briefs + other items):
- Other items dispatch on 6th May 2026
- Briefs are subject to further delays — escalate to Christine for briefs specifically

ORDER TRACKING (non pre-order):
- Processing time is 3-5 business days (excluding weekends)
- Orders placed before 1pm prioritised for same-day processing
- Once shipped, customers receive a tracking link via email
- Direct them to: <a href="https://everformwear.com.au/apps/aftership" target="_blank">Track your order</a>
- Always offer: "If you have any trouble just reply to this email with your order number and we will help"

RETURNS AND EXCHANGES — CORRECT FLOW:

EXCHANGES:
- First check eligibility: item must be unworn, unwashed, tags attached, in original packaging, within 30 days of delivery
- If eligible: direct to exchange portal: <a href="https://portal.refundid.com/stores/everform-therapywear" target="_blank">Start your exchange here</a>
- Exchanges are for same product in a different size
- Postpartum Briefs and LBL styles: exchange or store credit only — not refund — must be unopened

REFUNDS:
- Always escalate to Christine — do not process or promise refunds yourself
- Respond: "I will pass this to our customer service manager Christine who will personally follow up within 24 hours (48 hours on weekends) to assist you with your refund."

FAULTY ITEMS:
- Direct to Refundid portal to upload photos: <a href="https://portal.refundid.com/stores/everform-therapywear" target="_blank">Submit your faulty item here</a>
- Ask customer to include their order number and clear photos of the fault
- Always escalate to Christine as well

RETURN CONDITIONS (all items must be):
- In original as-new condition
- Unworn, unwashed and unaltered
- Tags, hygiene seals and packaging intact
- Free from marks, dust or odour
- Returned in original Everform box inside a protective outer shipping box

ELIGIBILITY BY PURCHASE TYPE:

FULL-PRICED ITEMS:
- May be returned for refund, exchange or store credit within 30 days of delivery

SALE AND PROMOTIONAL PURCHASES:
- Refunds and exchanges are NOT offered
- Items may be returned for store credit only

FINAL SALE ITEMS — CRITICAL:
- NOT eligible for return, exchange OR store credit under ANY circumstances
- NEVER direct Final Sale customers to the returns portal
- Respond with empathy and escalate to Christine

BUNDLE PURCHASES:
- Full refunds only when ALL items returned together
- Partial returns: refund adjusted minus proportional bundle discount
- All items must be unworn, unwashed, tags attached, packaging intact

MOTHER'S DAY GIFTING (purchases between 21 April and 9 May 2026):
- Extended 45-day returns and exchanges window applies
- Standard return conditions still apply

SHIPPING:
- Standard and Express options available
- Free standard shipping on Australian orders over $180, $10 flat rate under $180, Express $15 (free Express over $200)
- International: free over $300 AUD; under $300 calculated by location, shipped with DHL
- Same day dispatch for orders placed before 1pm on business days
- Express: 1-2 business days, Standard: 2-8 business days within Australia

SIZING AND FIT — ESCALATE ALL TO CHRISTINE:
- Do not attempt to answer sizing questions yourself
- Respond warmly: "Sizing is really important to get right with compression wear! I am going to pass you to our customer service manager Christine who will personally guide you to the perfect fit. She will follow up within 24 hours (48 hours on weekends)."
- Always escalate sizing queries to Christine

PROMOTIONAL CODES:
- May not apply if: product already discounted, another promotion active, code expired, or specific conditions apply
- Direct to hello@everformwear.com for help

FITTING CONSULTATION:
- Book directly with Anna or Rosie: <a href="https://calendly.com/d/47n-rz5-hfr/fitting-consultation" target="_blank">Book a fitting session</a>

HEALTH INSURANCE REBATES:
- All Everform products registered on TGA — eligible for health insurance rebates in Australia
- Rebate coverage varies by provider and plan
- For proof of purchase refer to automated invoice sent after purchase — contains the ARTG number
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
- Do not provide program details or sign up links
- Escalate to Christine: "Our customer service manager Christine would love to help you with this and will follow up within 24 hours (48 hours on weekends)."

RULES:
- ALWAYS introduce yourself as an AI in the first response
- Keep replies warm and concise
- Never invent order details, tracking numbers or stock info
- Do not mention competitors
- Always format links as HTML anchor tags
- Never tell customers to email — Christine will follow up directly
- Always give escalation timeframe: 24hrs weekdays, 48hrs weekends
- Tag every ticket Evie responds to with evie-replied

GORGIAS EMAIL REPLIES:
Write in plain warm professional English. Use the provided macro as your template if relevant — personalise to the customer. Replace {{customer.first_name}} with actual customer name. For briefs pre-order queries, use the Briefs on Pre-Order macro as your template. Sign off with:
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

    // CRITICAL CHECK — skip if agent has already replied
    const agentReplied = allMessages.some(function(m) {
      return m.from_agent === true && m.source && m.source.type === 'email';
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

    // Skip auto-replies, marketing, reviews etc
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

    // Determine if escalation needed
    const isWeekend = [0, 6].indexOf(new Date().getDay()) !== -1;
    const followUpTime = isWeekend ? '48 hours' : '24 hours';

    const needsEscalation =
      /refund|money back|reimburse/i.test(customerMessage) ||
      /faulty|damaged|defect|broken|wrong.item/i.test(customerMessage) ||
      /size|sizing|fit|too tight|too small|too big|too large|measurements|measure/i.test(customerMessage) ||
      /final.sale|policy.exception/i.test(customerMessage) ||
      /brief|lbl|pro support/i.test(customerMessage) ||
      /pre.order|preorder/i.test(customerMessage) ||
      /affiliate|wholesale|partner|collaborat/i.test(customerMessage) ||
      /track|where.*order|order.*status|no tracking|haven.t received|not received/i.test(customerMessage);

    // Tag ticket
    var tags = [{ name: 'evie-replied' }];
    if (needsEscalation) {
      tags.push({ name: 'Escalation' });
    }

    await fetch(
      'https://everformwear.gorgias.com/api/tickets/' + ticket_id,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': gorgiasAuth },
        body: JSON.stringify({ tags: tags })
      }
    );

    if (needsEscalation) {
      console.log('Tagged ticket ' + ticket_id + ' as Escalation');
    }

    // Fetch macros
    const macrosResponse = await fetch(
      'https://everformwear.gorgias.com/api/macros?limit=50',
      { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': gorgiasAuth } }
    );
    const macrosData = await macrosResponse.json();
    const macros = macrosData.data || [];

    // Find briefs pre-order macro specifically
    const briefsMacro = macros.find(function(m) {
      return m.name && m.name.toLowerCase().includes('briefs on pre-order');
    });

    // Build macro context
    var macroContext = '';
    var isBriefsQuery = /brief|lbl|pro support/i.test(customerMessage) && /pre.order|preorder|order|track|where|dispatch|ship/i.test(customerMessage);

    if (isBriefsQuery && briefsMacro) {
      macroContext = 'IMPORTANT: This customer is asking about briefs pre-order. Use this specific macro as your template:\n\n--- MACRO: Briefs on Pre-Order ---\n' + (briefsMacro.body_text || briefsMacro.body_html || '') + '\n\n';
    } else if (macros.length > 0) {
      macroContext = 'AVAILABLE MACROS (use the most relevant one as your template, personalise to this customer, replace {{customer.first_name}} with ' + customerFirstName + '):\n\n';
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
      escalationNote = '\n\nNOTE: This ticket has been flagged for escalation. Tell the customer warmly that Christine our customer service manager will personally follow up within ' + followUpTime + '. Do NOT tell them to email — Christine will reach out directly through this ticket.';
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
            content: macroContext + 'Draft a reply to this customer email. Customer name: ' + customerFirstName + '. Their message: ' + customerMessage + escalationNote
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
