import type { Faq, LongFormSection } from "@/types/content";

/**
 * Frequently asked questions, grouped by topic, and the interim legal text.
 *
 * ⚠️ PLACEHOLDER — the FAQ answers are realistic studio policy written ahead
 * of the client's own; confirm fees, timelines and warranty terms before
 * launch. The legal sections describe what the website's code actually does
 * today but are NOT reviewed legal documents; /privacy and /terms stay
 * noindex until they are.
 */
export type FaqGroup = { id: string; title: string; items: Faq[] };

export const FAQ_GROUPS: FaqGroup[] = [
    {
        id: "getting-started",
        title: "Getting started",
        items: [
            { question: "Is the first consultation really free?", answer: "Yes. It is a 45-minute conversation by phone, video or at the studio, with no obligation to proceed." },
            { question: "What should I bring to the first meeting?", answer: "A floor plan if you have one, photographs of the space, and pictures of rooms you like — and ones you do not." },
            { question: "Do you take small projects?", answer: "We do. A single kitchen, a bedroom or a reception area is welcome, and often how longer relationships begin." },
            { question: "Which cities do you work in?", answer: "We are based in Mumbai and regularly work in Pune, Delhi, Bangalore and Ahmedabad, as well as weekend towns around Mumbai." },
        ],
    },
    {
        id: "fees-and-budget",
        title: "Fees and budget",
        items: [
            { question: "How do you charge for design?", answer: "Our design fee is fixed at the start, based on the area and scope. It is not a percentage of what you spend." },
            { question: "Can you work to a fixed budget?", answer: "Yes. Tell us the number at the first meeting and we will say honestly what it can achieve, then design to it." },
            { question: "What does an interior typically cost?", answer: "It varies widely with area, finishes and the amount of custom joinery. We give a realistic range at the first consultation, and an itemised estimate once the layout is agreed." },
            { question: "How are payments scheduled?", answer: "Design fees are paid by phase. Execution is billed against milestones on site, never fully in advance." },
        ],
    },
    {
        id: "process-and-timeline",
        title: "Process and timeline",
        items: [
            { question: "How long does a project take?", answer: "A typical three-bedroom home takes eight to ten weeks to design and document, and twelve to sixteen weeks to build." },
            { question: "Will I see the design before work starts?", answer: "Yes. Every project is modelled in three dimensions, and you walk through it and approve it before anything is built." },
            { question: "How many revisions are included?", answer: "Two rounds at the design development stage. Most projects settle within them." },
            { question: "Can I use my own contractor?", answer: "You can. We offer design-only engagements with periodic site visits to protect the design intent." },
        ],
    },
    {
        id: "execution-and-site",
        title: "Execution and site",
        items: [
            { question: "Who supervises the site?", answer: "A dedicated site supervisor is there daily, and your project lead visits at every stage that needs a decision." },
            { question: "How will I know what is happening?", answer: "You receive a short progress note every week with photographs, work completed and what comes next." },
            { question: "Do you handle society and landlord permissions?", answer: "We prepare the drawings and submissions, and plan work around permitted hours, lift use and debris rules." },
            { question: "What if something changes mid-project?", answer: "Any variation is priced and agreed in writing before it is built. There are no surprises on the final bill." },
        ],
    },
    {
        id: "after-handover",
        title: "After handover",
        items: [
            { question: "Is there a warranty?", answer: "Workmanship is covered for twelve months from handover, and manufacturer warranties on appliances and hardware are passed to you in full." },
            { question: "What do I receive at handover?", answer: "As-built drawings, a schedule of every material and finish, warranties and a care guide for each surface." },
            { question: "Do you help with maintenance later?", answer: "Yes. We return for a review at twelve months and can arrange repairs or refreshes at any time after." },
        ],
    },
];

export const ALL_FAQS: Faq[] = FAQ_GROUPS.flatMap((group) => group.items);

/** The three questions shown beside the booking form. */
export const BOOKING_FAQS: Faq[] = [FAQ_GROUPS[0].items[0], FAQ_GROUPS[1].items[0], FAQ_GROUPS[2].items[0]];

/* ── Legal (interim) ───────────────────────────────────────────────────── */

export const PRIVACY_SECTIONS: LongFormSection[] = [
    {
        id: "what-we-collect",
        heading: "What we collect",
        paragraphs: [
            "Only what you type into a form: your name, email address, phone number, the service you selected and any message you write. The newsletter form collects an email address and nothing else.",
            "We do not run advertising trackers and we do not build a profile of you.",
        ],
    },
    {
        id: "how-we-use-it",
        heading: "How we use it",
        paragraphs: [
            "A submitted enquiry is emailed to the studio and recorded so it cannot be lost. It is used to reply to you and to plan the work you asked about.",
            "A newsletter address is used only to send the newsletter, and every issue carries a way to stop receiving it.",
        ],
    },
    {
        id: "who-sees-it",
        heading: "Who sees it",
        paragraphs: [
            "The studio's own team. Your details are not sold, and are not shared with anyone outside the studio except the email and storage providers that carry them on our behalf.",
        ],
    },
    {
        id: "how-long-we-keep-it",
        heading: "How long we keep it",
        paragraphs: [
            "Enquiries are kept for as long as we are in conversation with you, and for a reasonable period afterwards in case you return. You can ask us to delete yours at any time.",
        ],
    },
    {
        id: "your-choices",
        heading: "Your choices",
        paragraphs: [
            "Write to the studio to ask what we hold about you, to correct it, or to have it deleted. We will action the request and confirm when it is done.",
        ],
    },
];

export const TERMS_SECTIONS: LongFormSection[] = [
    {
        id: "using-this-website",
        heading: "Using this website",
        paragraphs: [
            "This website describes the studio's services and shows examples of its work. You are welcome to browse it, share links to it and contact us through it.",
            "Please do not attempt to disrupt the site, submit forms automatically or use it to send unsolicited messages.",
        ],
    },
    {
        id: "content-and-images",
        heading: "Content and images",
        paragraphs: [
            "The text, drawings and photographs on this site belong to the studio or are used with permission. Please ask before reproducing them.",
            "Images and figures are illustrative. Finished projects vary with site conditions, materials and client choices.",
        ],
    },
    {
        id: "enquiries-and-estimates",
        heading: "Enquiries and estimates",
        paragraphs: [
            "Sending an enquiry does not create a contract, and nothing on this website is a quotation. Timelines and budget ranges mentioned here are typical, not promised.",
            "A project begins only when a written proposal has been issued by the studio and accepted by you.",
        ],
    },
    {
        id: "liability",
        heading: "Liability",
        paragraphs: [
            "We work to keep this website accurate and available, but it is provided as it is, and we cannot accept liability for decisions made on the basis of its general content alone.",
        ],
    },
    {
        id: "changes",
        heading: "Changes to these terms",
        paragraphs: ["These terms may be updated from time to time. The version on this page is the one in force."],
    },
];
