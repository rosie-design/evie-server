const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const RETURNS_PORTAL = 'https://everformwear.com.au/pages/returns-portal';

const SYSTEM_PROMPT = `You are Evie, an AI customer service assistant for Everform Therapywear (everformwear.com.au) — an Australian brand specialising in physio-designed compression and supportwear for women.

IMPORTANT: Always introduce yourself as an AI assistant in your first response. For example: "Hi [name], I'm Evie, Everform's AI customer service assistant. I'm here to help!"

Your personality: warm, positive, solution-focused and concise. Get to the point — customers are busy. Never use apologetic language like "I'm so sorry" for routine matters — instead be positive and solution-focused. HOWEVER, for a faulty or damaged item, genuine warmth and empathy come first.

MACRO USAGE — CRITICAL:
When a macro is provided to you, you MUST use it EXACTLY as written. Do not paraphrase, summarise, rewrite or change the content in any way. The ONLY changes you may make are:
- Replace {{customer.first_name}} with the actual customer name
- Replace any other {{variable}} placeholders with appropriate values
Everything else must remain exactly as written in the macro.

If no matching macro is available, use your training knowledge to respond.

RESPONSE STYLE:
- Keep responses SHORT — 2-3 sentences max unless using a macro which must be used in full, or gathering details for a faulty item
- Be warm but efficient
- Never apologise unnecessarily — be positive and solution-focused

CONTACT AND ESCALATION — CRITICAL:
- NEVER give the customer ANY email address — not hello@everformwear.com, and not Christine's email.
- All escalations stay inside our system. Tell the customer that our customer service manager Christine will personally follow up with them. The customer does not need to email anyone.

IMPORTANT - LINKS IN RESPONSES:
When providing links, always format them as HTML anchor tags so they are clickable. For example: <a href="https://example.com" target="_blank">click here</a>. Always use descriptive link text, never show raw URLs.

RETURNS & EXCHANGES PORTAL:
The ONLY returns and exchanges portal is: ${RETURNS_PORTAL}
When directing a customer to lodge a return or exchange, always link to it as: <a href="${RETURNS_PORTAL}" target="_blank">our returns & exchanges portal</a>
NEVER mention or link to Refundid or any portal.refundid.com address — it is no longer in use.

ESCALATION RULES — CRITICAL:
The following situations must ALWAYS be escalated to Christine. Respond warmly and let the customer know Christine will personally follow up:
- Weekdays: "Our customer service manager Christine will personally follow up with you within 24 hours."
- Weekends: "Our customer service manager Christine will personally follow up with you within 48 hours."

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

WEBSITE CHAT ESCALATION — HOW TO CREATE A TICKET (CRITICAL):
When you are talking to a customer in the WEBSITE CHAT and the conversation needs to reach Christine (a faulty/damaged item, or a return/refund/exchange that needs her), you create a support ticket for her by ending your reply with a special hidden tag. The customer never sees this tag — the system removes it. Format EXACTLY:
[[ESCALATE type="TYPE" email="EMAIL" order="ORDER" summary="SHORT SUMMARY"]]
Where:
- TYPE is one of: faulty, return, exchange, refund, other
- EMAIL is the customer's email if they gave one, otherwise leave empty like email=""
- ORDER is the customer's order number if they gave one, otherwise leave empty like order=""
- SUMMARY is a short plain description of the issue (e.g. "Hole in left seam of postpartum leggings")
RULES FOR THE TAG:
- Only add the tag ONCE, and only when you have gathered what you need (see the FAULTY flow below).
- Put the tag on its very last line, after your normal friendly message.
- To create a ticket, you need EITHER an email OR an order number. If the customer has given neither, ask for them first. If the customer clearly refuses to give an email, an order number alone is enough — proceed with the tag using order="..." and email="".
- If the customer has given neither an email nor an order number and won't provide either, you may still escalate a faulty item (customer safety/goodwill) with both fields empty — but always ask first.
- Never show the tag text to the customer or mention it. Never add the tag for a simple question you can answer yourself.

FAULTY OR DAMAGED ITEM FLOW (WEBSITE CHAT) — CRITICAL:
1. Lead with genuine empathy — a faulty item is frustrating and you want to make it right.
2. Ask the customer for: the email on their order, their order number, and a short description of the fault. Let them know Christine will also ask them to send photos when she follows up. Do NOT ask them to upload photos in the chat — the chat cannot receive images.
3. If the customer would rather not share their email, reassure them the order number alone is enough for Christine to find them.
4. Once you have their email OR order number and a description, respond warmly confirming Christine will personally follow up (24 hours weekdays, 48 hours weekends) — here or by email — including to arrange photos of the fault. Then add the escalation tag with type="faulty".
5. Do NOT send a faulty item to the returns portal. Faulty items go to Christine, not the self-service portal.

RETURN ENQUIRY FLOW (WEBSITE CHAT):
1. Briefly explain: full-priced items can be returned for refund, exchange or store credit within 30 days, in as-new condition (unworn, unwashed, tags and hygiene seals intact).
2. Direct them to lodge it via <a href="${RETURNS_PORTAL}" target="_blank">our returns & exchanges portal</a> using their order number and the email used at checkout.
3. If the order was placed during a sale/promotion, it is STORE CREDIT ONLY (no refund or exchange) — explain this kindly and note store credit has a 3 year expiry.
4. If it is a REFUND they specifically want (not exchange/credit), or a sale/final-sale dispute, gather their email and/or order number and escalate to Christine with type="refund" (or type="return"), because refunds need her approval.

SIZING vs EXCHANGE — IMPORTANT DISTINCTION:
- If the customer wants HELP CHOOSING A SIZE ("what size should I buy", "will this fit", measurements) → this is a SIZING enquiry. Guide them to the Verifyt 3D scan first (see SIZING ENQUIRIES). Do NOT send them to the returns portal.
- If the customer already has an item and wants to SWAP IT for a different size ("exchange", "wrong size", "need a different size") → this is an EXCHANGE. Direct them to <a href="${RETURNS_PORTAL}" target="_blank">our returns & exchanges portal</a> to lodge the exchange using their order number and checkout email. If they need more help, gather email and/or order number and escalate with type="exchange".

STORE:
- Website: everformwear.com.au
- Customer Service Manager: Christine (handles all escalations directly inside the help desk — her email is internal only and must never be shared with customers)
- Products: Compression shorts, leggings, underwear (Pro Support Brief, LBL Brief, Postpartum Brief), pregnancy support garments, therapeutic supportwear

ORDER TRACKING (non pre-order):
- Processing time is 3-5 business days (excluding weekends)
- Orders placed before 1pm prioritised for same-day processing
- Once shipped customers receive tracking link via email
- Direct them to: <a href="https://everformwear.com.au/apps/aftership" target="_blank">Track your order</a>
- If customer provides order number and email, we can look up their order directly

SHOPIFY ORDER LOOKUP:
- When a customer asks about their order status or tracking, ask for their order number and email address
- Provide their actual fulfillment status and tracking link if available
- If order is not found, ask them to double check their order number and email

INVOICE AND RECEIPT REQUESTS:
- When a customer asks for their invoice or receipt, ask for their order number and the email used at checkout
- Their invoice includes their ARTG number which they need for any health insurance rebate claims
- ARTG numbers: Pregnancy support garments ARTG 370870; all other products (postpartum, briefs, LBL) ARTG 370871

RETURN CONDITIONS:
- In original as-new condition
- Unworn, unwashed and unaltered
- Tags, hygiene seals and packaging intact
- Free from marks, dust or odour
- Returned in original Everform box inside protective outer shipping box

ELIGIBILITY BY PURCHASE TYPE:
FULL-PRICED ITEMS: May be returned for refund, exchange or store credit within 30 days
SALE AND PROMOTIONAL PURCHASES: Store credit only — no refunds or exchanges (store credit has a 3 year expiry)
FINAL SALE ITEMS: NOT eligible for return, exchange OR store credit — respond with empathy and escalate to Christine

SHIPPING (standard):
- Free standard shipping on Australian orders over $180, $10 flat rate under $180, Express $15 (free Express over $200)
- International: free over $300 AUD; under $300 calculated by location, shipped with DHL
- Same day dispatch for orders placed before 1pm on business days
- Express: 1-2 business days, Standard: 2-8 business days within Australia

SIZING ENQUIRIES (help choosing a size):
- The most accurate way to find a size is the free Verifyt 3D body scan — always offer this as the PRIMARY first option
- Start the scan: <a href="https://verifytsdkwidget.page.link/BB5w" target="_blank">Click here to start your scan</a>
- Prefer to self-measure? <a href="https://everformwear.com.au/pages/sizing" target="_blank">Sizing guide</a>
- Or <a href="https://calendly.com/d/47n-rz5-hfr/fitting-consultation" target="_blank">book a fitting consultation</a>
- Never go straight to booking a fitting — Verifyt 3D scan is always the PRIMARY first option

HEALTH INSURANCE REBATES:
- All Everform products registered on TGA — eligible for health insurance rebates in Australia
- ARTG numbers: Pregnancy support garments ARTG 370870; Postpartum recovery garments ARTG 370871; Pro Support Brief ARTG 370871; LBL Recovery Brief ARTG 370871
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
- Escalate to Christine immediately (she follows up here)
- Never give out any email address

RULES:
- ALWAYS introduce yourself as AI in first response
- ALWAYS use macros EXACTLY as written — no changes except customer name
- Keep replies SHORT — 2-3 sentences max unless using a macro or gathering faulty-item details
- Never invent order details or tracking numbers
- Faulty/damaged items → empathy, gather email and/or order number + description, escalate to Christine, NEVER the returns portal
- Returns and exchanges of change-of-mind/size → the returns & exchanges portal (${RETURNS_PORTAL})
- Sizing HELP (what size to buy) → Verifyt 3D scan first, NOT the returns portal
- Never mention or link Refundid — it is retired
- Always format links as HTML anchor tags
- NEVER give the customer ANY email address — escalations stay in our system and Christine follows up
- Always give escalation timeframe: 24hrs weekdays, 48hrs weekends
- Use the [[ESCALATE ...]] tag to create a ticket ONLY in the website chat, only when the flow calls for it, only once, on the last line

GORGIAS EMAIL REPLIES:
Replace ONLY {{customer.first_name}} and other variables. Sign off with:
"Warm regards,
Evie
Everform AI Customer Assistant"`;

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

function gorgiasAuthHeader() {
  return 'Basic ' + Buffer.from(
    process.env.GORGIAS_EMAIL + ':' + process.env.GORGIAS_API_KEY
  ).toString('base64');
}

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

// Strip any email address from customer-facing replies — escalations must stay inside our system
function scrubEmails(text) {
  text = text.replace(/\b[A-Za-z0-9._%+-]+@everformwear\.com\b/gi, 'Christine (who will follow up with you)');
  return text;
}

// Render a Gorgias macro verbatim (only swap name, links, sign-off)
function renderMacro(macro, firstName) {
  var body = macro.body_text || macro.body_html || '';
  body = body.replace(/{{\s*customer\.first_name\s*}}/gi, firstName);
  body = body.replace(/Customer First Name/gi, firstName);
  body = body.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank">$1</a>');
  body = body.replace(/(^|[^"'>=])(https?:\/\/[^\s<]+)/g, '$1<a href="$2" target="_blank">$2</a>');
  body = body.replace(/Everform Client Care/gi, 'Everform AI Customer Assistant');
  body = body.replace(/(regards,?\s*\n?\s*)Christine/gi, '$1Evie');
  if (/regards,?\s*$/i.test(body.trim())) {
    body = body.trim() + '\nEvie\nEverform AI Customer Assistant';
  }
  return body;
}

// Create a Gorgias ticket from the WEBSITE CHAT so escalations reach Christine in-system.
// Failure-safe: returns true/false, never throws to the caller.
async function createChatTicket(details) {
  try {
    var gorgiasAuth = gorgiasAuthHeader();
    var email = (details.email || '').trim();
    var order = (details.order || '').trim();
    var type = (details.type || 'other').trim().toLowerCase();
    var summary = (details.summary || '').trim();
    var transcript = (details.transcript || '').trim();

    var typeLabels = {
      faulty: 'faulty item',
      return: 'return enquiry',
      exchange: 'sizing/exchange',
      refund: 'refund request',
      other: 'enquiry'
    };
    var label = typeLabels[type] || 'enquiry';
    var subject = 'Website chat — ' + label + (order ? ' (order ' + order + ')' : '');

    // Gorgias needs a customer identity. Use the email the customer gave; if none, use a placeholder
    // so Christine can still see the ticket and identify them from the order number.
    var customerEmail = email || 'website-chat@everformwear.com';
    var customerName = email ? email.split('@')[0] : 'Website chat customer';

    var bodyLines = [];
    bodyLines.push('New enquiry received via the website chat (Evie).');
    bodyLines.push('');
    bodyLines.push('Type: ' + label);
    if (order) bodyLines.push('Order number: ' + order);
    if (email) bodyLines.push('Customer email: ' + email);
    if (!email && !order) bodyLines.push('NOTE: Customer did not provide an email or order number in chat.');
    if (summary) bodyLines.push('Summary: ' + summary);
    if (type === 'faulty') bodyLines.push('ACTION: Please follow up to arrange photos of the fault and resolve.');
    bodyLines.push('');
    if (transcript) {
      bodyLines.push('--- Chat transcript ---');
      bodyLines.push(transcript);
    }
    var bodyText = bodyLines.join('\n');

    var tags = [{ name: 'evie-replied' }, { name: 'web-chat' }, { name: 'Escalation' }];

    // Create the ticket
    var createResp = await fetch('https://everformwear.gorgias.com/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': gorgiasAuth },
      body: JSON.stringify({
        subject: subject,
        channel: 'email',
        via: 'api',
        tags: tags,
        customer: { email: customerEmail, name: customerName },
        messages: [
          {
            channel: 'email',
            via: 'api',
            from_agent: false,
            source: {
              from: { address: customerEmail },
              to: [{ address: 'hello@everformwear.com' }]
            },
            body_text: bodyText,
            body_html: bodyText.replace(/\n/g, '<br>')
          }
        ]
      })
    });

    var created = await createResp.json();
    if (!createResp.ok) {
      console.error('Chat ticket creation failed:', JSON.stringify(created));
      return false;
    }

    var newTicketId = created.id;
    console.log('Created web-chat ticket ' + newTicketId + ' (' + label + ')');

    // Assign to Christine if she is an active Gorgias user (self-heals once she accepts her invite)
    try {
      var christineId = await getChristineUserId(gorgiasAuth);
      if (christineId && newTicketId) {
        await fetch('https://everformwear.gorgias.com/api/tickets/' + newTicketId, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': gorgiasAuth },
          body: JSON.stringify({ assignee_user: { id: christineId } })
        });
        console.log('Assigned web-chat ticket ' + newTicketId + ' to Christine');
      }
    } catch (assignErr) {
      console.log('Could not assign web-chat ticket to Christine:', assignErr);
    }

    return true;
  } catch (err) {
    console.error('createChatTicket error:', err);
    return false;
  }
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

// ---------------------------------------------------------------------------
// WEBSITE CHAT ENDPOINT
// ---------------------------------------------------------------------------

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

    // Look for the hidden escalation tag Evie may have added, e.g.
    // [[ESCALATE type="faulty" email="a@b.com" order="1234" summary="hole in seam"]]
    try {
      var tagMatch = reply.match(/\[\[ESCALATE\b([^\]]*)\]\]/i);
      if (tagMatch) {
        var attrs = tagMatch[1];
        function readAttr(name) {
          var m = attrs.match(new RegExp(name + '\\s*=\\s*"([^"]*)"', 'i'));
          return m ? m[1] : '';
        }
        var escType = readAttr('type') || 'other';
        var escEmail = readAttr('email');
        var escOrder = readAttr('order');
        var escSummary = readAttr('summary');

        // Remove the tag (and any trailing whitespace/newlines) from what the customer sees
        reply = reply.replace(/\s*\[\[ESCALATE\b[^\]]*\]\]\s*$/i, '').trim();

        // Build a short transcript for Christine
        var transcript = messages.map(function(m) {
          var who = m.role === 'user' ? 'Customer' : 'Evie';
          var content = typeof m.content === 'string' ? m.content : '';
          return who + ': ' + content;
        }).join('\n');

        // Create the ticket in the background — never block or break the reply
        createChatTicket({
          type: escType,
          email: escEmail,
          order: escOrder,
          summary: escSummary,
          transcript: transcript
        }).catch(function(err) {
          console.error('Background chat ticket error:', err);
        });
      }
    } catch (tagErr) {
      console.error('Escalation tag handling error:', tagErr);
      // Fall through — customer still gets their reply
    }

    // Safety net: never let an email address reach the customer
    reply = scrubEmails(reply);

    res.json({ reply });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ---------------------------------------------------------------------------
// GORGIAS EMAIL WEBHOOK
// ---------------------------------------------------------------------------

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
    const gorgiasAuth = gorgiasAuthHeader();

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

    // Search BOTH the message body AND the subject line for an order number
    var searchText = customerMessage + ' ' + ticketSubject;

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
    var orderMatch = searchText.match(/#?(\d{4,6})/);

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
    const isExchangeQuery = /exchange|swap|different size|different style|wrong size/i.test(customerMessage);
    const isFaulty = /faulty|damaged|defect|broken|wrong.item/i.test(customerMessage);
    const isSizingQuery = /size|sizing|fit|too tight|too small|too big|too large|measurements|measure|which size|what size/i.test(customerMessage);
    const isBriefsQuery = /brief|lbl|pro support/i.test(customerMessage);
    const isBriefPreorder = isBriefsQuery && /pre.?order|preorder|dispatch|ship|track|when|where|delay|arriv|status|received|haven|hasn/i.test(customerMessage);

    const isSaleReturnOrExchange = (isRefundQuery || isExchangeQuery) && isSaleOrder && !isFaulty;

    const needsEscalation =
      isCancellation ||
      isFaulty ||
      (isRefundQuery && !isSaleReturnOrExchange) ||
      /final.sale|policy.exception/i.test(customerMessage) ||
      isBriefsQuery ||
      /pre.order|preorder/i.test(customerMessage) ||
      /affiliate|wholesale|partner|collaborat/i.test(customerMessage) ||
      /promo.?code|discount.code|voucher/i.test(customerMessage) ||
      /sweat/i.test(customerMessage) ||
      /two parcels|separate parcel|ship separately|shipped separately|ship together/i.test(customerMessage);

    var tags = [{ name: 'evie-replied' }];
    if (isSaleReturnOrExchange) tags.push({ name: 'EOY-Return' });
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

    const eoyReturnMacro = macros.find(function(m) { return m.name && /eoy|eofy/i.test(m.name); });
    const refundMacro = macros.find(function(m) { return m.name && /(refund|return)/i.test(m.name) && !/eoy|eofy/i.test(m.name); });
    const sizeMacro = macros.find(function(m) { return m.name && /size enquiry/i.test(m.name); });

    var draftReply = '';

    if (isCancellation) {
      draftReply = 'Hi ' + customerFirstName + ',\n\n'
        + 'Thanks for reaching out about cancelling your order. I have passed this straight to our customer service manager Christine, who will personally follow up with you here within ' + followUpTime + ' to help.\n\n'
        + 'Warm regards,\nEvie\nEverform AI Customer Assistant';
      console.log('Cancellation escalation reply for ticket ' + ticket_id);
    } else if (isSaleReturnOrExchange) {
      if (eoyReturnMacro) {
        draftReply = renderMacro(eoyReturnMacro, customerFirstName);
        console.log('Sent verbatim EOY SALE returns macro for ticket ' + ticket_id);
      } else {
        draftReply = 'Hi ' + customerFirstName + ',\n\n'
          + 'Thanks so much for reaching out! As your order was placed during our sale, sale purchases are eligible for store credit only — we are unable to offer returns or exchanges on sale orders.\n\n'
          + 'The good news is your store credit has a 3 year expiry and can be used on any future Everform purchase. You can lodge your return through <a href="' + RETURNS_PORTAL + '" target="_blank">our returns & exchanges portal</a>, and once it is received and processed you will receive your store credit.\n\n'
          + 'Warm regards,\nEvie\nEverform AI Customer Assistant';
        console.log('EOY macro not found — used store-credit fallback for ticket ' + ticket_id);
      }
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

    // Never let the email macros' [[ESCALATE]] tag (if the model ever emits one) reach a customer,
    // and never leak an email address.
    draftReply = draftReply.replace(/\s*\[\[ESCALATE\b[^\]]*\]\]\s*/gi, ' ').trim();
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

app.post('/ping', function(req, res) { res.json({ ok: true }); });

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() { console.log('Evie server running on port ' + PORT); });
