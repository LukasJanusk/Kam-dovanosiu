export default function Loading() {
  // Stack uses React Suspense, which will render this page while user data is being fetched.
  // See: https://nextjs.org/docs/app/api-reference/file-conventions/loading
  return (
    <div className="relative w-full h-full flex ">
      <span className="loading loading-dots loading-xl justify-center items-center mr-auto ml-auto"></span>
    </div>
  );
}
