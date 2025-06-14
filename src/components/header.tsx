"use client";
/**
 * @description A header component for the form builder page.
 * It displays the title "Form Preview" with some styling.
 *@returns {JSX.Element} The rendered header component.
*/

const Header = () => {
  return (
    <header className="p-4">
      <div className="flex items-center border-b w-full border-b text-gray-900">
        <h2 className="p-2 text-2xl font-semibold mr-2 mb-6">Form Preview</h2>
      </div>
    </header>
  );
};

export { Header };
