import { useNavigate, useLocation } from 'react-router-dom';

export default function RoutesUse(group: string, page: string) {
  const navigate = useNavigate();
  const location = useLocation();
  const groupIndex = location.pathname.replace(location.pathname[location.pathname.lastIndexOf('/') - 1], group);
  const newPath = `${groupIndex.slice(0, location.pathname.lastIndexOf('/'))}/${page}`;
  navigate(newPath);
}
