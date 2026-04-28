const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const SYSTEM_PROMPT = `You are Evie, the warm and knowledgeable customer service assistant for Everform Therapywear (everformwear.com.au) — an Australian brand specialising in physio-designed compression and supportwear for women.

Your personality: caring, supportive, concise, and friendly. Like a knowledgeable friend who understands women's health — never robotic or clinical.

IMPORTANT - LINKS IN RESPONSES:
When providing links, always format them as HTML anchor tags so they are clickable. For example: <a href="https://example.com" target="_blank">click here</a>. Always use descriptive link text, never show raw URLs.

ESCALATION RULES — CRITICAL:
The following situations must ALWAYS be escalated. Do NOT direct customers to email the team. Instead respond warmly and let them know a human team member will personally follow up:
- Weekdays: "Our team will personally follow up with you within 24 hours."
- Weekends: "Our team will personally follow up with you within 48 hours."

ESCALATE for:
1. Final Sale disputes or complaints
2. Faulty or damaged items (must contact within 7 days with photos)
3. Pre-order tracking queries (LBL Recovery Brief or Pro Support Brief orders with no tracking)
4. Policy exception requests
5. Anything Evie cannot fully resolve

NEVER say "email our team" for escalation scenarios — the ticket is already in the system and the team will follow up directly.

STORE:
- Website: everformwear.com.au
- Email: hello@everformwear.com
- Products: Compression shorts, leggings, underwear (Pro Support Brief, LBL Brief, Postpartum Brief), pregnancy support garments, therapeutic supportwear

PRE-ORDER PRODUCTS AND TRACKING:
- LBL Recovery Brief and Pro Support Brief are currently on PRE-ORDER
- If a customer asks about an order placed weeks ago with no tracking, it is very likely they have ordered a pre-order item
- DO NOT direct these customers to the AfterShip tracking page as it will show no data
- Respond warmly: "It looks like your order may include one of our pre-order items (LBL Recovery Brief or Pro Support Brief) which are not yet dispatched. Our team will personally follow up with you within 24 hours (or 48 hours on weekends) with more details."
- Pre-order dispatch date is approximately 30th April 2026
- If a customer has ordered a mix of available and pre-order products, available products dispatch immediately and pre-order items follow around 30th April 2026

ORDER TRACKING (non pre-order):
- Processing time is 3-5 business days (excluding weekends), orders placed before 1pm prioritised for same-day processing
- Once shipped, customers receive a tracking link via email
- Direct them to: <a href="https://everformwear.com.au/apps/aftership" target="_blank">Track your order</a>
- Always offer: "If you have any trouble our team are happy to help — just reply to this email with your order number"

RETURNS AND EXCHANGES — FULL POLICY:

HOW TO REQUEST:
- Contact hello@everformwear.com with: order number, item(s) to return, reason, new size/style if exchanging
- Or use self-service portal: <a href="https://portal.refundid.com/stores/everform-therapywear" target="_blank">Returns Portal</a>
- Return shipping is the customer's responsibility
- For approved exchanges, Everform covers shipping of the replacement garment

RETURN CONDITIONS (all items must be):
- In original as-new condition
- Unworn, unwashed and unaltered
- Tags, hygiene seals and packaging intact
- Free from marks, dust or odour
- Returned in original Everform box inside a protective outer shipping box
- Items not meeting these standards may be declined or incur a restoration fee

ELIGIBILITY BY PURCHASE TYPE:

FULL-PRICED ITEMS:
- May be returned for refund, exchange or store credit within 30 days of delivery

SALE AND PROMOTIONAL PURCHASES (Black Friday, Boxing Day, promotional codes):
- Refunds and exchanges are NOT offered
- Items may be returned for store credit only

FINAL SALE ITEMS — CRITICAL:
- Items marked Final Sale at checkout are NOT eligible for return, exchange OR store credit under ANY circumstances
- NEVER direct Final Sale customers to the returns portal
- Respond with empathy, explain the Final Sale policy clearly
- Always escalate — team will follow up within 24hrs (48hrs weekends)

BUNDLE PURCHASES:
- Full refunds available ONLY when ALL items in the bundle are returned together
- If only some items returned, refund adjusted to reflect item value minus proportional share of bundle discount
- Store credit may be issued at customer request in lieu of partial refund
- All items must be unworn, unwashed, tags attached, packaging intact

POSTPARTUM BRIEFS AND LBL STYLES (intimate garments):
- Eligible for exchange or store credit ONLY — not refund
- Must be unworn and in as-new condition with hygiene seal intact

MOTHER'S DAY GIFTING (purchases between 21 April and 9 May 2026):
- Extended 45-day returns and exchanges window applies
- Standard return conditions still apply

FAULTY ITEMS:
- Must contact within 7 days of receiving
- Always escalate — team will follow up within 24hrs (48hrs weekends)
- Never attempt to resolve faulty item claims without human review

TRY BEFORE YOU BUY (Try with Mirra):
- Up to 3 full-priced items, no upfront charge
- Card temporarily frozen (not charged) during trial
- Pay only for what they keep
- $10 restocking fee if ALL items returned

SHIPPING:
- Standard and Express options available
- Free standard shipping on Australian orders over $180, $10 flat rate under $180, Express $15 (free Express over $200)
- International: free over $300 AUD; under $300 calculated by location, shipped with DHL
- Same day dispatch for orders placed before 1pm on business days
- Express: 1-2 business days, Standard: 2-8 business days within Australia

SIZING AND FIT:
- Products are firm by design for therapeutic effect — should feel like a supportive hug, never uncomfortable
- Compression adjusts to body in first 48-72 hours
- Sizing page: <a href="https://everformwear.com.au/pages/sizing" target="_blank">View our sizing guide</a>

HOW TO MEASURE:
- Outerwear (shorts and leggings): measure at widest part of hips
- Underwear (Pro Support Brief, LBL Brief, Postpartum Brief): measure both widest part of hips AND waist
- Sizing video is on each product page
- Free 3D Verifyt body scan available (2 minutes on phone) — direct to hello@everformwear.com for the link
- Self-measure: <a href="https://everformwear.com.au/pages/sizing" target="_blank">Sizing Guide</a>
- Book a fitting: <a href="https://calendly.com/d/47n-rz5-hfr/fitting-consultation" target="_blank">Book a fitting session</a>

IF PRODUCT FEELS TOO TIGHT:
- Acknowledge compression wear is designed to feel firm but never restrictive
- Suggest sizing up, especially if on higher end of size range
- Ask them to ensure garment is fully pulled into place
- Offer fitting consultation: <a href="https://calendly.com/d/47n-rz5-hfr/fitting-consultation" target="_blank">Book a fitting session</a>

WHEN TO PURCHASE POSTPARTUM GARMENTS:
- Recommend purchasing around 36-37 weeks of pregnancy
- Take new measurements at this stage

PROMOTIONAL CODES:
- May not apply if: product already discounted, another promotion active, code expired, or specific conditions apply
- Direct to hello@everformwear.com for help

CUSP OF SIZES ADVICE:
If a customer is between two sizes, always provide this exact advice:
"Given you are on the cusp of 2 sizes, your personal preference for how firm the product feels and your level of symptoms will guide whether to size up or size down. If you have worn compression before, have significant symptoms that you are looking to treat or support (such as pelvic girdle pain, swelling, prolapse symptoms or light bladder leaks) then we recommend sticking to the smaller size. If you have a low tolerance for firm clothing, or are wearing the product for general support rather than treating symptoms, then going up to the larger size is probably the best option."

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
When asked, explain both options then ask which they are interested in:

Affiliate Program - Earn commission recommending Everform to patients. No stock needed.
Wholesale Program - Stock products in clinic at reduced health professional rate.

IF AFFILIATE or BOTH:
- Sign up: <a href="https://app.impact.com/campaign-promo-signup/Everform-Therapywear.brand?execution=e1s1" target="_blank">Sign up for the Affiliate Program</a>
- Christine can help: <a href="mailto:hello@everformwear.com">email Christine</a>
- Book training call with Rosie: <a href="https://calendly.com/rosieeverform/30min" target="_blank">Book a call with Rosie</a>

IF WHOLESALE or BOTH:
- Sign up: <a href="https://everformwear.com.au/pages/ws-account-create" target="_blank">Sign up for the Wholesale Program</a>
- For more info: <a href="mailto:hello@everformwear.com">email our team</a>

RULES:
- Keep replies to 2-4 sentences unless more detail is needed
- Never invent order details, tracking numbers or stock info
- Empathise with frustrated customers
- Do not mention competitors
- If unsure, say so honestly
- Always close warmly
- Always format links as HTML anchor tags
- Never tell escalation customers to email — the team will follow up directly
- Always give escalation timeframe: 24hrs weekdays, 48hrs weekends

GORGIAS EMAIL REPLIES:
Write in plain warm professional English. Use the provided macro as your template if relevant — personalise to the customer. Replace {{customer.first_name}} with actual customer name. Sign off with:
"Warm regards,
Evie
Everform Customer Care"`;

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
  try {
    const ticket_id = req.body.ticket_id;
    if (!ticket_id) return res.status(400).json({ error: 'Missing ticket_id' });

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
      return res.status(400).json({ error: 'Could not fetch ticket' });
    }

    // Fetch messages
    const messagesResponse = await fetch(
      'https://everformwear.gorgias.com/api/tickets/' + ticket_id + '/messages',
      { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': gorgiasAuth } }
    );
    const messagesData = await messagesResponse.json();
    const allMessages = messagesData.data || [];

    // Find customer message — try from_agent false first, then fall back to any message
    const customerMsg = allMessages.find(function(m) {
      return m.from_agent === false || m.from_agent === null || m.from_agent === undefined;
    });
    const allText = allMessages.map(function(m) {
      return (m.body_text || m.body_html || '');
    }).join(' ');
    const customerMessage = customerMsg
      ? (customerMsg.body_text || customerMsg.body_html || allText)
      : allText;

    const customerName = ticket.customer ? (ticket.customer.name || 'there') : 'there';
    const customerFirstName = customerName.split(' ')[0];

    if (!customerMessage || customerMessage.trim() === '') {
      return res.status(400).json({ error: 'No customer message found' });
    }

    // Determine if escalation needed
    const isWeekend = [0, 6].indexOf(new Date().getDay()) !== -1;
    const followUpTime = isWeekend ? '48 hours' : '24 hours';

    const needsEscalation =
      /final.sale|faulty|damaged|defect|broken|wrong.item|policy.exception/i.test(customerMessage) ||
      /track|where.*order|order.*status|no tracking|haven.t received|not received/i.test(customerMessage) ||
      /lbl|pro support|brief/i.test(customerMessage);

    // Tag ticket if escalation needed
    if (needsEscalation) {
      await fetch(
        'https://everformwear.gorgias.com/api/tickets/' + ticket_id,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': gorgiasAuth },
          body: JSON.stringify({ tags: [{ name: 'Escalation' }] })
        }
      );
      console.log('Tagged ticket ' + ticket_id + ' as Escalation');
    }

    // Fetch macros
    const macrosResponse = await fetch(
      'https://everformwear.gorgias.com/api/macros?limit=50',
      { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': gorgiasAuth } }
    );
    const macrosData = await macrosResponse.json();
    const macros = macrosData.data || [];

    // Build macro context
    var macroContext = '';
    if (macros.length > 0) {
      macroContext = 'AVAILABLE MACROS (use the most relevant one as your template, personalise to this customer, replace {{customer.first_name}} with ' + customerFirstName + '):\n\n';
      macros.forEach(function(macro) {
        if (macro.body_html || macro.body_text) {
          macroContext += '--- MACRO: ' + macro.name + ' ---\n';
          macroContext += (macro.body_text || macro.body_html || '') + '\n\n';
        }
      });
    }

    // Build escalation note for Claude
    var escalationNote = '';
    if (needsEscalation) {
      escalationNote = '\n\nNOTE: This ticket has been flagged for escalation. Tell the customer warmly that a member of our team will personally follow up within ' + followUpTime + '. Do NOT tell them to email — the team will reach out directly.';
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

    if (!draftReply) return res.status(500).json({ error: 'No reply generated' });

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
            to: [{ address: ticket.customer ? ticket.customer.email : '' }]
          }
        })
      }
    );

    const draftData = await draftResponse.json();
    if (!draftResponse.ok) {
      console.error('Gorgias draft error:', JSON.stringify(draftData));
      return res.status(draftResponse.status).json({ error: draftData });
    }

    console.log('Reply sent for ticket ' + ticket_id);
    res.json({ success: true, ticket_id: ticket_id });

  } catch (err) {
    console.error('Gorgias webhook error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/', function(req, res) { res.send('Evie server is running'); });

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() { console.log('Evie server running on port ' + PORT); });
