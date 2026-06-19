const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const SYSTEM_PROMPT = `You are Evie, an AI customer service assistant for Everform Therapywear (everformwear.com.au) — an Australian brand specialising in physio-designed compression and supportwear for women.

IMPORTANT: Always introduce yourself as an AI assistant in your first response. For example: "Hi [name], I'm Evie, Everform's AI customer service assistant. I'm here to help!"

Your personality: warm, positive, solution-focused and concise. Get to the point — customers are busy. Never use apologetic language like "I'm so sorry" — instead be positive and solution-focused.

MACRO USAGE — CRITICAL:
When a macro is provided to you, you MUST use it EXACTLY as written. Do not paraphrase, summarise, rewrite or change the content in any way. The ONLY changes you may make are:
- Replace {{customer.first_name}} with the actual customer name
- Replace any other {{variable}} placeholders with appropriate values
Everything else must remain exactly as written in the macro.

If no matching macro is available, use your training knowledge to respond.

RESPONSE STYLE:
- Keep responses SHORT — 2-3 sentences max unless using a macro which must be used in full
- Be warm but efficient
- Never apologise unnecessarily — be positive and solution-focused

CONTACT AND ESCALATION — CRITICAL:
- NEVER give the customer ANY email address — not hello@everformwear.com, and not Christine's email.
- All escalations stay inside THIS conversation. Tell the customer that our customer service manager Christine will personally follow up with them HERE (in this same thread). The customer does not need to email anyone — Christine handles escalated tickets directly within our help desk and will reply right here.
- Never tell a customer to "email us", "reach out by email", or "contact our team at" any address.

IMPORTANT - LINKS IN RESPONSES:
When providing links, always format them as HTML anchor tags so they are clickable. For example: <a href="https://example.com" target="_blank">click here</a>. Always use descriptive link text, never show raw URLs.

ESCALATION RULES — CRITICAL:
The following situations must ALWAYS be escalated to Christine. Respond warmly and let the customer know Christine will personally follow up with them here:
- Weekdays: "Our customer service manager Christine will personally follow up with you here within 24 hours."
- Weekends: "Our customer service manager Christine will personally follow up with you here within 48 hours."

ALWAYS ESCALATE TO CHRISTINE:
1. Refund requests
2. Cancellation requests (including cancelling a pre-order)
3. Faulty or damaged items
4. Sizing enquiries where customer is still unhappy after Evie's first response
5. Briefs (underwear) pre-order queries
6. Mixed orders — whether items ship separately or together (policy not yet confirmed)
7. Policy exception requests
8. Final Sale disputes
9. Affiliate or wholesale enquiries
10. Promotional code issues
11. SWEAT membership code not received or not working
12. Anything Evie cannot fully resolve

STORE:
- Website: everformwear.com.au
- Customer Service Manager: Christine (handles all escalations directly inside the help desk — her email is internal only and must never be shared with customers)
- Products: Compression shorts, leggings, underwear (Pro Support Brief, LBL Brief, Postpartum Brief), pregnancy support garments, therapeutic supportwear

CURRENT SALE — BUY 2 SAVE 30% (16–20 JUNE 2026) — CRITICAL:

SALE PERIOD:
- Sale is LIVE Tuesday 16 June to Sunday 20 June 2026, closing 11:59pm Sunday 20 June.
- From Monday 22 June 2026 the full-price store resumes and the standard returns policy is reinstated.

THE OFFER — BUY 2, SAVE 30%:
- 30% off applies automatically at checkout when 2 or more qualifying items are in the cart. No code is needed.
- Single-item orders do NOT receive a discount.
- Bundles are EXCLUDED — they are already discounted and do not qualify.
- If a customer says the discount hasn't applied, ask them to confirm they have 2 or more non-bundle items in their cart before checking out.

BONUS OFFER 1 — FREE 3-MONTH SWEAT MEMBERSHIP (Fri 19 June to midnight Sun 20 June only):
- Every purchase made during this window receives a complimentary 3-month SWEAT membership via a post-purchase email flow.
- The unique code is valid until 20 November 2026 — customers do not need to activate it immediately.
- If a customer hasn't received their code or reports it isn't working, escalate to Christine.

BONUS OFFER 2 — FREE BRILLO BEAUTY PRODUCT, up to $45 RRP (Sun 20 June only, first 40 orders):
- The first 40 orders placed on Sunday 20 June receive a complimentary Brillo Beauty product.
- Strictly the first 40 orders only. Do NOT promise this to any customer — advise it is subject to availability.

SALE SHIPPING:
- Free shipping on orders $200 and over.
- Orders under $200 are subject to standard shipping rates.

SALE RETURNS AND EXCHANGES — STORE CREDIT ONLY:
- All orders placed during the promotional window (9am Tue 16 June to 11:59pm Sun 20 June 2026) are eligible for STORE CREDIT ONLY — no returns or exchanges — regardless of reason.
- Store credit has a 3 year expiry and can be used on any future Everform purchase.
- Standard returns and exchange conditions resume from Monday 22 June 2026.
- This sale returns rule OVERRIDES the standard returns policy for any order placed within the sale window.

PRE-ORDER ITEMS — CRITICAL:

A) SALE SOLD-OUT SIZES (leggings and shorts that sold out during the sale):
- During the sale, sizes that sold out were switched from "Sold out" to "Pre-order". Any size showing "Pre-order" is sold out in current stock and will be fulfilled from incoming stock.
- These pre-order items are scheduled to ship 7 JULY 2026. Always give 7 July 2026 as the ship date. Do NOT mention any other date.
- You can tell an order contains one of these because the order data will be flagged as containing a pre-order item. When it is, reassure the customer: the order is confirmed and paid; the pre-order item ships 7 July 2026; any in-stock items in the same order ship now.
- LEGGINGS — POCKETS FREE UPGRADE: customers who pre-ordered a sold-out size of the original (no pockets) leggings will receive the new "With Pockets" version at NO extra cost. Always frame this as a free upgrade, never as a substitution problem.
- SHORTS: pre-order shorts ship from their own incoming stock. There is no pockets version, so the upgrade message does NOT apply to shorts.
- QUICK ANSWERS:
  * "Is my order confirmed?" → Yes, your order is fully placed and paid. One or more items are on pre-order because that size sold out; it ships 7 July 2026.
  * "When will it arrive?" → Pre-order items are scheduled to ship 7 July 2026; delivery follows normal transit times after that.
  * "I ordered the leggings without pockets — what will I get?" → You'll receive the upgraded With-Pockets version at no extra charge.
  * "Why does it say pre-order?" → That size sold out, so rather than remove it we let you reserve it from our incoming stock.
- NOT YET DEFINED — ESCALATE TO CHRISTINE, DO NOT GUESS:
  * Whether a MIXED order (pre-order item + in-stock item) ships in two parcels or holds and ships together.
  * Cancelling or refunding a pre-order before it ships.
  If asked about either, escalate to Christine (she follows up here) and do not state a policy.

B) BRIEFS (LBL Recovery Brief and Pro Support Brief) — UNDERWEAR PRE-ORDER:
- This is SEPARATE from the sale sold-out pre-orders. Dispatch dates for underwear pre-orders are TO BE CONFIRMED. Do NOT give any date (do not say 7 July).
- Let the customer know Christine will personally follow up with them here with the latest update. Do NOT give out any email address.
- Always escalate to Christine.

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
- If the order is flagged as containing a pre-order item, give the 7 July 2026 ship date
- If order is not found, ask them to double check their order number and email; if still not found escalate to Christine

INVOICE AND RECEIPT REQUESTS:
- When a customer asks for their invoice or receipt, look up their order in Shopify using their order number and email
- Retrieve the invoice URL from the order metafields
- Send them a direct clickable link: <a href="[invoice_url]" target="_blank">Click here to view and download your invoice</a>
- Let them know: "Your invoice includes your ARTG number which you will need for any health insurance rebate claims."
- ARTG numbers: Pregnancy support garments ARTG 370870; all other products (postpartum, briefs, LBL) ARTG 370871
- If the invoice URL cannot be found, ask for their order number and email and escalate to Christine

RETURNS AND EXCHANGES (standard — applies outside the sale window):

EXCHANGES — EVIE HANDLES FULLY:
- Check eligibility: unworn, unwashed, tags attached, original packaging, within 30 days
- If eligible direct to: <a href="https://portal.refundid.com/stores/everform-therapywear" target="_blank">Start your exchange here</a>
- Postpartum Briefs and LBL: exchange or store credit only, must be unopened

REFUNDS AND RETURNS — USE MACRO, ESCALATE TO CHRISTINE:
- Use the Refund Request macro EXACTLY as written
- These must be approved by Christine — the ticket is tagged for her approval
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

SHIPPING (standard — applies outside the sale window):
- Standard and Express options available
- Free standard shipping on Australian orders over $180, $10 flat rate under $180, Express $15 (free Express over $200)
- International: free over $300 AUD; under $300 calculated by location, shipped with DHL
- Same day dispatch for orders placed before 1pm on business days
- Express: 1-2 business days, Standard: 2-8 business days within Australia

SIZING ENQUIRIES — USE MACRO EXACTLY:
- Always use the Size Enquiry Info macro EXACTLY as written
- Never go straight to booking a fitting — Verifyt 3D scan is always the PRIMARY first option

PROMOTIONAL CODES:
- Escalate to Christine
- Respond: "Our customer service manager Christine will personally look into this for you and follow up here within 24 hours (48 hours on weekends)."

HEALTH INSURANCE REBATES:
- All Everform products registered on TGA — eligible for health insurance rebates in Australia
- ARTG numbers: Pregnancy support garments ARTG 370870; Postpartum recovery garments ARTG 370871; Pro Support Brief ARTG 370871; LBL Recovery Brief ARTG 370871
- Medical prescription if needed: <a href="https://drive.google.com/file/d/1yzC8Fruk1AfeK8tzsIyjNXUtCNY_C8Ia/view?usp=drive_link" target="_blank">Download the prescription pad</a>
- Direct customers to request their invoice for proof of purchase — it contains the ARTG number

PRODUCT SYMPTOM GUIDE:
Pregnancy Support Garments (Legging, 8 inch Short, 5 inch Short):
- Suitable for: pelvic girdle pain, SIJ pain, symphysis pubis dysfunction, sciatica, low back pain, mild/moderate varicose veins, vulval varicosities, mild stress incontinence, mild bladder or uterine prolapse, pelvic congestion syndrome, swelling management

Postpartum Recovery Garments (Legging, 8 inch Short, 5 inch Short, Brief):
- Suitable for: pelvic girdle pain, SIJ pain, abdominal muscle separation, perineal tears and stitches, C-section and episiotomy wounds, sciatica, mild/moderate varicose veins, mild stress incontinence, mild bladder or uterine prolapse, pelvic congestion syndrome

Pelvic Floor Support Wear:
- LBL Brief: pelvic girdle pain, sciatica, low back pain, mild/moderate varicose veins, vulval varicosities, mild stress incontinence, pelvic congestion syndrome
- Pro Support Brief: pelvic girdle pain, sciatica, low back pain, mild/moderate varicose veins, vulval varicosities, mild bladder or uterine prolapse, pelvic congestion syndrome

AFFILIATES AND WHOLESALE:
- Escalate to Christine immediately (she follows up here)
- Never give out any email address

RULES:
- ALWAYS introduce yourself as AI in first response
- ALWAYS use macros EXACTLY as written — no changes except customer name
- Keep replies SHORT — 2-3 sentences max unless using a macro
- Never invent order details or tracking numbers
- Sale sold-out pre-orders ship 7 July 2026 (never mention any other date); briefs underwear pre-orders are TBC — Christine follows up here
- Never state whether a mixed order ships separately or together — escalate to Christine
- Never confirm a cancellation or pre-order refund yourself — escalate to Christine
- Never go straight to booking a fitting — always offer Verifyt first
- Never promise the Brillo Beauty bonus — it is subject to availability (first 40 orders Sun 20 June only)
- During the sale window, returns are STORE CREDIT ONLY regardless of reason
- Always format links as HTML anchor tags
- NEVER give the customer ANY email address — escalations stay in this thread and Christine follows up here
- Always give escalation timeframe: 24hrs weekdays, 48hrs weekends
- Tag every ticket Evie responds to with evie-replied

GORGIAS EMAIL REPLIES:
Replace ONLY {{customer.first_name}} and other variables. Sign off with:
"Warm regards,
Evie
Everform AI Customer Assistant"`;

// Cache for Christine's Gorgias user id (only positive results cached, so it self-heals once she accepts her invite)
var christineUserIdCache = null;

async function getChristineUserId(gorgiasAuth) {
  if (christineUserIdCache) return christineUserIdCache;
  try {
    var resp = await fetch('https://everformwear.gorgias.com/api/users?limit=100', {
      method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': gorgiasAuth }
    });
    var data = await resp.json();
    var users = data.data || [];
    var christine = users.find(function(u) {
      return u.email && u.email.toLowerCase() === 'christine@everformwear.com';
    });
    if (christine) {
      christineUserIdCache = christine.id;
      return christine.id;
    }
  } catch (err) {
    console.log('Could not look up Christine user:', err);
  }
  return null;
}

// Strip any email address from customer-facing replies — escalations must stay inside Gorgias
function scrubEmails(text) {
  text = text.replace(/\b[A-Za-z0-9._%+-]+@everformwear\.com\b/gi, 'Christine (who will reply to you right here)');
  return text;
}

// Render a Gorgias macro verbatim (only swap name, links, sign-off)
function renderMacro(macro, firstName) {
  var body = macro.body_text || macro.body_html || '';
  body = body.replace(/{{\s*customer\.first_name\s*}}/gi, firstName);
  body = body.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank">$1</a>');
  body = body.replace(/Everform Client Care/gi, 'Everform AI Customer Assistant');
  body = body.replace(/(regards,?\s*\n?\s*)Christine/gi, '$1Evie');
  return body;
}

// Auto-reply and non-customer email detection
function shouldSkip(subject, body, senderEmail) {
  var autoReplyPatterns = [
    /out of office/i, /out-of-office/i, /auto.?reply/i, /automatic.?reply/i, /automated.?reply/i,
    /away from (the )?office/i, /on leave/i, /on vacation/i, /annual leave/i, /maternity leave/i,
    /currently away/i, /currently out/i, /i am away/i, /i will be (out|away|unavailable)/i,
    /do not reply/i, /do-not-reply/i, /noreply/i, /no-reply/i, /this is an automated/i,
    /this email was sent automatically/i, /please do not respond/i, /delivery (status )?notification/i,
    /mail delivery failed/i, /returned mail/i, /unsubscribe/i, /review notification/i,
    /left a review/i, /new review/i, /star review/i, /submitted a review/i, /judge\.me/i,
    /yotpo/i, /klaviyo/i, /mailchimp/i, /notification/i
  ];

  var nonCustomerPatterns = [
    /partnership/i, /collaboration/i, /influencer/i, /ambassador/i, /press release/i,
    /media enquiry/i, /marketing proposal/i, /advertising opportunity/i, /sponsored/i,
    /brand deal/i, /pr opportunity/i, /campaign proposal/i, /link building/i,
    /seo (services|proposal|offer)/i, /guest post/i, /content marketing/i,
    /digital marketing (agency|services)/i, /we (can help|specialise|offer)/i,
    /our (agency|company|team) (can|offers|provides|specialises)/i,
    /commission (payment|notification)/i, /supplier/i, /bulk order/i, /trade (inquiry|enquiry|account)/i
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

// Shopify order lookup with invoice URL and pre-order detection
async function lookupOrder(orderNumber, customerEmail) {
  try {
    var cleanOrder = orderNumber.replace('#', '').trim();
    var url = 'https://lennyroseactive.myshopify.com/admin/api/2024-01/orders.json?name=' + encodeURIComponent(cleanOrder) + '&status=any';
    var response = await fetch(url, {
      method: 'GET',
      headers: { 'X-Shopify-Access-Token': process.env.SHOPIFY_API_TOKEN, 'Content-Type': 'application/json' }
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

    var lineItemTitles = [];
    var hasPreorder = false;
    (order.line_items || []).forEach(function(li) {
      lineItemTitles.push(li.title);
      var props = li.properties || [];
      props.forEach(function(p) {
        if (!p) return;
        var pname = (p.name || '').toString();
        var pval = (p.value || '').toString();
        if (/pre.?order/i.test(pname) || /2026\/07\/07/.test(pval) || /ships from/i.test(pval)) {
          hasPreorder = true;
        }
      });
    });

    var invoiceUrl = null;
    try {
      var metafieldsResponse = await fetch(
        'https://lennyroseactive.myshopify.com/admin/api/2024-01/orders/' + order.id + '/metafields.json',
        { method: 'GET', headers: { 'X-Shopify-Access-Token': process.env.SHOPIFY_API_TOKEN, 'Content-Type': 'application/json' } }
      );
      var metafieldsData = await metafieldsResponse.json();
      var metafields = metafieldsData.metafields || [];
      var invoiceMetafield = metafields.find(function(m) {
        return m.key === 'invoice_url' || m.key === 'public_url';
      });
      if (invoiceMetafield) invoiceUrl = invoiceMetafield.value;
    } catch (err) {
      console.log('Could not fetch invoice metafields:', err);
    }

    return {
      orderNumber: order.name,
      fulfillmentStatus: order.fulfillment_status || 'unfulfilled',
      financialStatus: order.financial_status,
      trackingNumber: fulfillment ? fulfillment.tracking_number : null,
      trackingUrl: fulfillment ? fulfillment.tracking_url : null,
      createdAt: order.created_at,
      lineItems: lineItemTitles,
      hasPreorder: hasPreorder,
      invoiceUrl: invoiceUrl
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
    var reply = data.content && data.content[0] ? data.content[0].text : '';
    reply = scrubEmails(reply);
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

    const ticketResponse = await fetch(
      'https://everformwear.gorgias.com/api/tickets/' + ticket_id,
      { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': gorgiasAuth } }
    );
    const ticket = await ticketResponse.json();
    if (!ticketResponse.ok) {
      console.error('Failed to fetch ticket:', ticket);
      return;
    }

    const messagesResponse = await fetch(
      'https://everformwear.gorgias.com/api/tickets/' + ticket_id + '/messages',
      { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': gorgiasAuth } }
    );
    const messagesData = await messagesResponse.json();
    const allMessages = messagesData.data || [];

    const agentReplied = allMessages.some(function(m) {
      return m.from_agent === true && m.via !== 'api';
    });
    if (agentReplied) {
      console.log('Skipping ticket ' + ticket_id + ' — agent has already replied');
      return;
    }

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

    var orderData = null;
    var orderContext = '';
    var isInvoiceQuery = /invoice|receipt|proof of purchase|artg|health insurance|rebate/i.test(customerMessage);
    var orderMatch = customerMessage.match(/#?(\d{4,6})/);

    if (orderMatch && process.env.SHOPIFY_API_TOKEN) {
      orderData = await lookupOrder(orderMatch[0], customerEmail);
      if (orderData) {
        orderContext = 'SHOPIFY ORDER DATA for ' + orderData.orderNumber + ':\n';
        orderContext += '- Status: ' + orderData.fulfillmentStatus + '\n';
        orderContext += '- Payment: ' + orderData.financialStatus + '\n';
        orderContext += '- Items: ' + orderData.lineItems.join(', ') + '\n';
        if (orderData.trackingNumber) orderContext += '- Tracking number: ' + orderData.trackingNumber + '\n';
        if (orderData.trackingUrl) orderContext += '- Tracking URL: ' + orderData.trackingUrl + '\n';
        if (orderData.invoiceUrl) orderContext += '- Invoice URL: ' + orderData.invoiceUrl + '\n';
        if (orderData.hasPreorder) orderContext += '- CONTAINS A PRE-ORDER ITEM (sold-out sale size), ships 7 July 2026\n';
        orderContext += '\n';

        if (orderData.hasPreorder) {
          orderContext += 'IMPORTANT: This order includes a pre-order item (a size that sold out during the sale). Reassure the customer the order is confirmed and paid; the pre-order item is scheduled to ship 7 July 2026; any in-stock items ship now. If they pre-ordered an original no-pockets legging, tell them they will receive the upgraded With-Pockets version at no extra cost. Do NOT state whether items ship in separate parcels — if asked, escalate to Christine.\n\n';
        }

        if (isInvoiceQuery && orderData.invoiceUrl) {
          orderContext += 'IMPORTANT: Customer is asking about their invoice. Send them this link: ' + orderData.invoiceUrl + ' and remind them it contains their ARTG number for health insurance claims.\n\n';
        } else if (isInvoiceQuery && !orderData.invoiceUrl) {
          orderContext += 'IMPORTANT: Customer is asking about their invoice but no invoice URL was found. Ask them to provide their order number and email and escalate to Christine.\n\n';
        }
      }
    } else if (isInvoiceQuery && !orderMatch) {
      orderContext = 'IMPORTANT: Customer is asking about their invoice but has not provided an order number. Ask for their order number and email address so you can retrieve their invoice.\n\n';
    }

    var isSaleOrder = false;
    if (orderData && orderData.createdAt) {
      var created = new Date(orderData.createdAt);
      var saleStart = new Date('2026-06-16T00:00:00+10:00');
      var saleEnd = new Date('2026-06-21T00:00:00+10:00');
      if (created >= saleStart && created < saleEnd) isSaleOrder = true;
    }

    const isWeekend = [0, 6].indexOf(new Date().getDay()) !== -1;
    const followUpTime = isWeekend ? '48 hours' : '24 hours';

    const isCancellation = /cancel|cancellation/i.test(customerMessage);
    const isRefundQuery = /refund|return|money back|reimburse/i.test(customerMessage);
    const isSizingQuery = /size|sizing|fit|too tight|too small|too big|too large|measurements|measure|which size|what size/i.test(customerMessage);
    const isBriefsQuery = /brief|lbl|pro support/i.test(customerMessage);
    const isBriefPreorder = isBriefsQuery && /pre.?order|preorder|dispatch|ship|track|when|where|delay|arriv|status|received|haven|hasn/i.test(customerMessage);

    const needsEscalation =
      isCancellation ||
      isRefundQuery ||
      /faulty|damaged|defect|broken|wrong.item/i.test(customerMessage) ||
      /final.sale|policy.exception/i.test(customerMessage) ||
      isBriefsQuery ||
      /pre.order|preorder/i.test(customerMessage) ||
      /affiliate|wholesale|partner|collaborat/i.test(customerMessage) ||
      /promo.?code|discount.code|voucher/i.test(customerMessage) ||
      /sweat/i.test(customerMessage) ||
      /two parcels|separate parcel|ship separately|shipped separately|ship together/i.test(customerMessage);

    // Build ticket update: tag, and (if escalation) assign to Christine so it lands in her Gorgias queue in-thread
    var tags = [{ name: 'evie-replied' }];
    if (needsEscalation) tags.push({ name: 'Escalation' });

    var ticketUpdate = { tags: tags };
    if (needsEscalation) {
      var christineId = await getChristineUserId(gorgiasAuth);
      if (christineId) {
        ticketUpdate.assignee_user = { id: christineId };
        console.log('Assigned escalation ticket ' + ticket_id + ' to Christine (user ' + christineId + ')');
      } else {
        console.log('Christine user not found yet — ticket ' + ticket_id + ' tagged Escalation only');
      }
    }

    await fetch(
      'https://everformwear.gorgias.com/api/tickets/' + ticket_id,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': gorgiasAuth },
        body: JSON.stringify(ticketUpdate)
      }
    );

    const macrosResponse = await fetch(
      'https://everformwear.gorgias.com/api/macros?limit=50',
      { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': gorgiasAuth } }
    );
    const macrosData = await macrosResponse.json();
    const macros = macrosData.data || [];

    const refundMacro = macros.find(function(m) { return m.name && /(refund|return)/i.test(m.name); });
    const sizeMacro = macros.find(function(m) { return m.name && /size enquiry/i.test(m.name); });

    var draftReply = '';

    if (isCancellation) {
      draftReply = 'Hi ' + customerFirstName + ',\n\n'
        + 'Thanks for reaching out about cancelling your order. I have passed this straight to our customer service manager Christine, who will personally follow up with you here within ' + followUpTime + ' to help.\n\n'
        + 'Warm regards,\nEvie\nEverform AI Customer Assistant';
      console.log('Cancellation escalation reply for ticket ' + ticket_id);
    } else if (isRefundQuery && isSaleOrder) {
      draftReply = 'Hi ' + customerFirstName + ',\n\n'
        + 'Thanks so much for reaching out! As your order was placed during our Buy 2 Save 30% sale, sale purchases are eligible for store credit only — we are unable to offer returns or exchanges on sale orders.\n\n'
        + 'The good news is your store credit has a 3 year expiry and can be used on any future Everform purchase. I have passed your request to our customer service manager Christine, who will personally follow up with you here within ' + followUpTime + ' to arrange this.\n\n'
        + 'Warm regards,\nEvie\nEverform AI Customer Assistant';
      console.log('Sale-order store-credit override for ticket ' + ticket_id);
    } else if (isRefundQuery && refundMacro) {
      draftReply = renderMacro(refundMacro, customerFirstName);
      console.log('Sent verbatim refund macro for ticket ' + ticket_id);
    } else if (isBriefPreorder) {
      draftReply = 'Hi ' + customerFirstName + ',\n\n'
        + 'Thanks so much for your patience! Dispatch dates for our underwear pre-orders (the LBL Recovery Brief and Pro Support Brief) are still to be confirmed. Our customer service manager Christine will personally follow up with you here within ' + followUpTime + ' with the latest update on your order.\n\n'
        + 'Warm regards,\nEvie\nEverform AI Customer Assistant';
      console.log('Brief pre-order open-ended reply for ticket ' + ticket_id);
    } else if (isSizingQuery && sizeMacro) {
      draftReply = renderMacro(sizeMacro, customerFirstName);
      console.log('Sent verbatim sizing macro for ticket ' + ticket_id);
    } else {
      var availableMacros = '';
      if (macros.length > 0) {
        availableMacros = 'AVAILABLE MACROS (if one exactly matches, reproduce it word for word, only swapping in the name "' + customerFirstName + '"):\n\n';
        macros.forEach(function(macro) {
          if (macro.body_html || macro.body_text) {
            availableMacros += '--- MACRO: ' + macro.name + ' ---\n' + (macro.body_text || macro.body_html || '') + '\n\n';
          }
        });
      }

      var escalationNote = '';
      if (needsEscalation) {
        escalationNote = '\n\nNOTE: This ticket needs escalation. Tell the customer Christine will personally follow up with them HERE (in this same conversation) within ' + followUpTime + '. Do NOT give out any email address.';
      }

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
              content: existingThreadContext + orderContext + availableMacros + 'Draft a reply to this customer email. Customer name: ' + customerFirstName + '. Their message: ' + customerMessage + escalationNote
            }
          ]
        })
      });

      const claudeData = await claudeResponse.json();
      draftReply = claudeData.content && claudeData.content[0] ? claudeData.content[0].text : '';
    }

    if (!draftReply) {
      console.error('No reply generated for ticket ' + ticket_id);
      return;
    }

    // Safety net: strip any email address before sending so escalations stay inside Gorgias
    draftReply = scrubEmails(draftReply);

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
