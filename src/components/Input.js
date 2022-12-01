const Input = (props) => {
  return (
    <input
      className={`block w-full rounded-md border border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-900 transition-all focus:border-gray-50 focus:ring-4 focus:ring-blue-300`}
      {...props}
    />
  );
};

export default Input;
