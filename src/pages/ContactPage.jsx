import React from "react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background text-foreground">

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary opacity-90" />
        <div className="relative container py-24 text-center text-white">
          <h1 className="text-5xl font-heading font-bold tracking-tight">
            Get in Touch
          </h1>
          <p className="mt-5 text-xl max-w-3xl mx-auto opacity-90">
            Powering pharmacies with reliable, secure & intelligent software
            solutions. We’re here to help.
          </p>
        </div>
      </section>

      {/* INFO CARDS */}
      <section className="container -mt-20 relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Call Us",
              value: "+91 98765 43210",
              desc: "Mon – Sat | 9AM – 7PM",
              icon: "📞",
            },
            {
              title: "Email Support",
              value: "support@pharmaapp.com",
              desc: "24x7 ticket assistance",
              icon: "📧",
            },
            {
              title: "Office Location",
              value: "Hyderabad, India",
              desc: "PharmaTech HQ",
              icon: "🏥",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/70 dark:bg-card/70 backdrop-blur-lg border rounded-xl p-8 shadow-xl hover:scale-[1.02] transition"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-lg mt-2">{item.value}</p>
              <p className="text-muted-foreground mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FORM + MAP */}
      <section className="container py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* FORM */}
          <div className="bg-white dark:bg-card rounded-2xl shadow-2xl p-5">
            <h2 className="text-4xl font-heading font-bold mb-2">
              Contact Our Team
            </h2>
            <p className="text-muted-foreground mb-8">
              Fill out the form and our pharma experts will reach out shortly.
            </p>

            <form className="space-y-6">
              <input
                className="w-full rounded-lg border bg-input px-4 py-3 focus:ring-2 ring-primary outline-none"
                placeholder="Full Name"
              />
              <input
                type="email"
                className="w-full rounded-lg border bg-input px-4 py-3 focus:ring-2 ring-primary outline-none"
                placeholder="Email Address"
              />
              <input
                className="w-full rounded-lg border bg-input px-4 py-3 focus:ring-2 ring-primary outline-none"
                placeholder="Phone Number"
              />
              <textarea
                rows="4"
                className="w-full rounded-lg border bg-input px-4 py-3 focus:ring-2 ring-primary outline-none"
                placeholder="How can we help you?"
              />
              <button className="w-full bg-gradient-to-r from-primary to-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition">
                Send Message
              </button>
            </form>
          </div>

          {/* MAP / INFO PANEL */}
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              className="w-full h-full"
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.4066464376576!2d78.3826557!3d17.4374626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93e81f2685ef%3A0x9f18e9a294b5f3b7!2sHitech%20City%2C%20Hyderabad!5e0!3m2!1sen!2sin!4v1700000000000"
            />
            <div className="absolute bottom-6 left-6 bg-white/80 dark:bg-card/80 backdrop-blur-lg p-5 rounded-xl shadow-lg">
              <h4 className="font-semibold">PharmaTech Solutions</h4>
              <p className="text-sm text-muted-foreground">
                Hitech City, Hyderabad
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default ContactPage;