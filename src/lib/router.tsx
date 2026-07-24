import { createContext, useCallback, useContext, useEffect, useState, type CSSProperties, type ReactNode } from 'react';

type RouterContextValue = {
  path: string;
  navigate: (to: string) => void;
};

const RouterContext = createContext<RouterContextValue>({ path: '/', navigate: () => {} });

function getPath() {
  const p = window.location.pathname;
  return p === '' ? '/' : p;
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(getPath);

  useEffect(() => {
    const onPop = () => setPath(getPath());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to: string) => {
    if (to === getPath()) return;
    window.history.pushState({}, '', to);
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  return useContext(RouterContext);
}

type LinkProps = {
  to: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  onClick?: () => void;
  end?: boolean;
};

export function Link({ to, className, style, children, onClick }: LinkProps) {
  const { navigate } = useRouter();
  const isHash = to.startsWith('#') || to.startsWith('http');
  if (isHash) {
    return (
      <a
        href={to}
        className={className}
        style={style}
        onClick={onClick}
        target={to.startsWith('http') ? '_blank' : undefined}
        rel={to.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }
  return (
    <a
      href={to}
      className={className}
      style={style}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}

type NavLinkRenderProps = { isActive: boolean };
type NavLinkProps = {
  to: string;
  className?: string | ((props: NavLinkRenderProps) => string);
  children: ReactNode | ((props: NavLinkRenderProps) => ReactNode);
  end?: boolean;
};

export function NavLink({ to, className, children, end }: NavLinkProps) {
  const { path, navigate } = useRouter();
  const isActive = end ? path === to : path.startsWith(to);
  const cls = typeof className === 'function' ? className({ isActive }) : className;
  return (
    <a
      href={to}
      className={cls}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
      }}
    >
      {typeof children === 'function' ? children({ isActive }) : children}
    </a>
  );
}

export function useLocation() {
  const { path } = useRouter();
  return { pathname: path };
}
