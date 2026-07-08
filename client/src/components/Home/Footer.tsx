function Footer() {
  const date = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-center text text-gray-50 p-2">
      <p className="text-sm">&copy; {date} Restarants. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
