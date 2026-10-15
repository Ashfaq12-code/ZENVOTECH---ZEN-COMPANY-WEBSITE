type ServiceBreadcrumbProps = {
  current: string;
};

// Visible trail Home > Services > page; Services has no page of its own, so it points at the home section.
export function ServiceBreadcrumb({ current }: ServiceBreadcrumbProps) {
  return (
    <nav className="service-breadcrumb uppercase" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span aria-hidden="true">/</span>
      <a href="/#services">Services</a>
      <span aria-hidden="true">/</span>
      <span aria-current="page">{current}</span>
    </nav>
  );
}
