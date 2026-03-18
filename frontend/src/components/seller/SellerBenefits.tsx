import { motion } from "motion/react";
import { Users, Zap, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";

const BENEFITS = [
  {
    title: "Reach students in your campus",
    description:
      "Connect with thousands of students within your campus community. No need to worry about shipping or long-distance travel.",
    icon: <Users className="w-6 h-6" />,
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    title: "Easy product listing",
    description:
      "List your items in under a minute. Just snap a photo, add a description, and set your price.",
    icon: <Zap className="w-6 h-6" />,
    color: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    title: "Chat directly with buyers",
    description:
      "Our built-in messaging system makes it easy to negotiate, answer questions, and arrange meetups.",
    icon: <MessageSquare className="w-6 h-6" />,
    color: "bg-purple-50 text-purple-600 border-purple-100",
  },
  {
    title: "Fast transactions",
    description:
      "Meet up on campus for quick and easy exchanges. No waiting for couriers or complex logistics.",
    icon: <ShieldCheck className="w-6 h-6" />,
    color: "bg-orange-50 text-orange-600 border-orange-100",
  },
];

export const SellerBenefits = () => {
  return (
    <section className="py-24 px-4 bg-neutral-50/50">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-bold uppercase tracking-wider border border-neutral-200"
          >
            <Sparkles className="w-3 h-3" />
            <span>Why Sell on Iskommerce?</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900"
          >
            Empowering Student Entrepreneurs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed"
          >
            Join the fastest growing campus marketplace and start earning today.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {BENEFITS.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-3xl bg-white border border-neutral-100 shadow-sm hover:shadow-xl hover:shadow-neutral-200/50 transition-all hover:-translate-y-1"
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center border mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3 ${benefit.color}`}
              >
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3 leading-tight">
                {benefit.title}
              </h3>
              <p className="text-neutral-500 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-12 rounded-[40px] bg-emerald-600 text-white overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <h3 className="text-3xl font-black tracking-tight">
                Ready to declutter and earn?
              </h3>
              <p className="text-emerald-50 max-w-md">
                It only takes a minute to set up your profile and post your
                first listing.
              </p>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-4xl font-black tracking-tight">₱150k+</div>
                <div className="text-xs font-bold uppercase tracking-widest text-emerald-200">
                  Total Payouts
                </div>
              </div>
              <div className="w-px h-12 bg-white/20 hidden sm:block" />
              <div className="text-center">
                <div className="text-4xl font-black tracking-tight">2.4k+</div>
                <div className="text-xs font-bold uppercase tracking-widest text-emerald-200">
                  Active Items
                </div>
              </div>
            </div>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};
