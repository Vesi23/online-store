import React from "react";

type CatalogBtnProps = {
	href?: string; // path to the PDF file (public folder)
	filename?: string; // suggested filename for download attribute
	className?: string;
	children?: React.ReactNode;
};

const CatalogBtn: React.FC<CatalogBtnProps> = ({
	href = '/assets/catalog.pdf',
	filename = 'catalog.pdf',
	className = '',
	children,
}) => {
	return (
		<a
			href={href}
			download={filename}
			target="_blank"
			rel="noopener noreferrer"
			className={`inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors ${className}`}
			title="Изтегли каталога"
		>
			{/* File / icon */}
			<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v12m0 0l4-4m-4 4l-4-4M21 21H3" />
			</svg>
			<span>{children ?? 'Изтегли каталог'}</span>
		</a>
	);
};

export default CatalogBtn;