import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color, trend }) => {
  return (
    <div className="glass-effect rounded-2xl p-6 card-hover relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${color} opacity-10 rounded-full blur-3xl`} />

      <div className="relative">
        <div className={`flex items-center justify-between mb-4`}>
          <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm font-medium text-green-400">{trend}</span>
        </div>

        <h3 className="text-sm text-blue-200/60 mb-1">{title}</h3>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;


// import React from 'react';
// import { motion } from 'framer-motion';

// const StatCard = ({ title, value, icon: Icon, color, trend }) => {
//   return (
//     <div className="glass-effect rounded-2xl p-6 card-hover relative overflow-hidden">
//       <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${color} opacity-10 rounded-full blur-3xl`} />
      
//       <div className="relative">
//         <div className={`flex items-center justify-between mb-4`}>
//           <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center`}>
//             <Icon className="w-6 h-6 text-white" />
//           </div>
//           <span className="text-sm font-medium text-green-400">{trend}</span>
//         </div>
        
//         <h3 className="text-sm text-blue-200/60 mb-1">{title}</h3>
//         <p className="text-3xl font-bold">{value}</p>
//       </div>
//     </div>
//   );
// };

// export default StatCard;