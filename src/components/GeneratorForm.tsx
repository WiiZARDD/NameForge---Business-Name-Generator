import React from 'react';
import { useForm } from 'react-hook-form';
import { Zap, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface GeneratorFormProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

const GeneratorForm: React.FC<GeneratorFormProps> = ({ onSubmit, isLoading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      keywords: '',
      industry: '',
      style: 'modern',
      maxLength: 12
    }
  });

  return (
    <motion.div 
      className="card p-6"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-1">
              Keywords or Description
            </label>
            <textarea
              id="keywords"
              {...register('keywords', { required: 'Please enter some keywords' })}
              className="input min-h-[80px]"
              placeholder="Enter keywords related to your brand (e.g., coffee, creative, digital)"
            ></textarea>
            {errors.keywords && (
              <p className="mt-1 text-sm text-error-600">{errors.keywords.message}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                Industry (Optional)
              </label>
              <input
                id="industry"
                type="text"
                {...register('industry')}
                className="input"
                placeholder="e.g., Technology, Food, Fashion"
              />
            </div>
            
            <div>
              <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-1">
                Name Style
              </label>
              <select
                id="style"
                {...register('style')}
                className="input"
              >
                <option value="modern">Modern</option>
                <option value="classic">Classic</option>
                <option value="techy">Technical</option>
                <option value="fun">Playful</option>
                <option value="abstract">Abstract</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="maxLength" className="block text-sm font-medium text-gray-700 mb-1">
                Max Length
              </label>
              <input
                id="maxLength"
                type="number"
                min="4"
                max="20"
                {...register('maxLength', { 
                  valueAsNumber: true,
                  min: { value: 4, message: 'Minimum length is 4' },
                  max: { value: 20, message: 'Maximum length is 20' }
                })}
                className="input"
              />
              {errors.maxLength && (
                <p className="mt-1 text-sm text-error-600">{errors.maxLength.message}</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="pt-2">
          <button 
            type="submit" 
            className="w-full btn btn-primary flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                Generating...
              </span>
            ) : (
              <span className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Generate Names
              </span>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default GeneratorForm;

function RefreshCw(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
      <path d="M21 3v5h-5"></path>
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
      <path d="M3 21v-5h5"></path>
    </svg>
  );
}