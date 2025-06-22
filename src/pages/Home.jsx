import React, { useContext, useEffect, useState } from 'react';
import CardProducto from '../components/CardProducto';
import CerrarSesion from '../components/CerrarSesion';
import { getUserData } from '../services/userService';
import { AuthContext } from '../context/AuthProvider';

function Home() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.uid) {
        const datos = await getUserData(user.uid);
        setUserData(datos);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="container mt-4">
      <h2>Bienvenido a EcoFood, {user ? user.email : 'invitado'}</h2>
      {userData && (
        <p>Nombre registrado: {userData.nombre}</p>
      )}

      <CerrarSesion />

      <h1 className="mt-4">Productos Disponibles</h1>
      <CardProducto nombre="Pan Integral" precio="$500" />
    </div>
  );
}

export default Home;