import React from 'react';
import { motion } from 'framer-motion';

const WelcomeMessage = () => {
  return (
    <motion.p
      className='text-xl md:text-2xl text-white max-w-2xl mx-auto'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      Olá! <span className='font-semibold text-purple-300'>Gamberine</span>,
      Última sincronização concluída há 12 minutos. 4 novas oportunidades aguardam revisão manu
    </motion.p>
  );
};

export default WelcomeMessage;

// import React from 'react';

// const WelcomeMessage = () => {
//   return (
//     <section className="rounded-3xl border border-slate-800/60 bg-slate-900/70 px-6 py-5 text-sm text-slate-300 sm:flex sm:items-center sm:justify-between sm:text-base">
//       <div>
//         <p className="font-medium text-white">Bom dia, equipe Allerto.</p>
//         <p className="mt-1 text-slate-400">
//           Última sincronização concluída há 12 minutos. 4 novas oportunidades aguardam revisão manual.
//         </p>
//       </div>
//       <div className="mt-4 flex items-center gap-4 sm:mt-0">
//         <span className="flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-wide text-slate-300">
//           <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
//           Operando normalmente
//         </span>
//       </div>
//     </section>
//   );
// };

// export default WelcomeMessage;
