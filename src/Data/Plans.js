const plans = [
  {
    title: "Basic",
    price: "3000 / Month",
    description: "Great for trying out Schedule and for tiny teams",
    features: [
      "Unlimited Scheduling Pages",
      "Embed Booking Forms",
      "Calendar Sync (Google, Outlook)",
      "Email & SMS Notifications",
      "Basic Booking Reports",
    ],
    buttonText: "Start Using Basic Package",
    popular: false,
  },
  {
    title: "Professional",
    price: "6000 / Month",
    description: "Best fit for growing sales teams and growth companies",
    features: [
      "Everything in Basic",
      "Paid Bookings (Stripe, PayPal)",
      "Abandoned Lead Capture & Follow-ups",
      "Fake Submission & Spam Filtering",
      "Team Scheduling & Round-Robin Routing",
      "Configurable Lead Stages & Tags",
      "API Access for Integrations",
    ],
    buttonText: "Jump Start Using Professionals",
    popular: true,
  },
  {
    title: "Enterprise",
    price: "9000 / Month",
    description:
      "Best for large companies and teams requiring high sales conversions",
    features: [
      "Everything in Professional",
      "AI-Powered Lead Qualification",
      "Advanced Call Funnel Analytics",
      "AI-Powered Follow-ups (WhatsApp, Email)",
      "Custom CRM & Workflow Integrations",
      "Conditional Call Routing",
    ],
    buttonText: "Boost Growth Using Enterprise",
    popular: false,
  },
];

export default plans;
