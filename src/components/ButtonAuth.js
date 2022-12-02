const ButtonAuth = ({ children, ...props }) => {
  return (
    <button
      type="submit"
      {...props}
      className="w-full rounded-md bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white transition-all hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
    >
      {children}
    </button>
  );
};

export default ButtonAuth;
