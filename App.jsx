import { useState } from 'react';
import './App.css';

function App() {
  const [ip, setIp] = useState('');
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocation(null);
    setError(null);

    try {
      if (!ip) {
        setError('Por favor, informe um IP.');
        return;
      }

      const response = await fetch(`https://ipinfo.io/${ip}/json?token=3bec9574027487`);
      
      if (!response.ok) {
        setError('Erro ao consultar o IP.');
        return;
      }

      const data = await response.json();
      setLocation(data);
    } catch (error) {
      setError('Falha na consulta do IP');
      console.error(error);
    }
  };

  // Função para formatar os dados de forma mais amigável
  const renderLocationData = (location) => {
    if (!location) return null;

    return (
      <div id="output">
        <h3>Informações sobre o IP: {location.ip}</h3>
        <p><strong>Cidade:</strong> {location.city}</p>
        <p><strong>Região:</strong> {location.region}</p>
        <p><strong>País:</strong> {location.country}</p>
        <p><strong>CEP:</strong> {location.postal}</p>
        <p><strong>Fuso Horário:</strong> {location.timezone}</p>
        <p><strong>Localização (Latitude, Longitude):</strong> {location.loc}</p>

        <h4>ASN (Sistema Autônomo)</h4>
        {location.asn ? (
          <>
            <p><strong>ASN:</strong> {location.asn.asn}</p>
            <p><strong>Nome:</strong> {location.asn.name}</p>
            <p><strong>Domínio:</strong> {location.asn.domain}</p>
            <p><strong>Tipo:</strong> {location.asn.type}</p>
          </>
        ) : (
          <p>Sem informações sobre ASN.</p>
        )}

        <h4>Informações sobre a Empresa</h4>
        {location.company ? (
          <>
            <p><strong>Nome da Empresa:</strong> {location.company.name}</p>
            <p><strong>Domínio:</strong> {location.company.domain}</p>
            <p><strong>Tipo:</strong> {location.company.type}</p>
          </>
        ) : (
          <p>Sem informações sobre a empresa.</p>
        )}

        <h4>Privacidade</h4>
        {location.privacy ? (
          <>
            <p><strong>VPN:</strong> {location.privacy.vpn ? 'Sim' : 'Não'}</p>
            <p><strong>Proxy:</strong> {location.privacy.proxy ? 'Sim' : 'Não'}</p>
            <p><strong>TOR:</strong> {location.privacy.tor ? 'Sim' : 'Não'}</p>
            <p><strong>Hosting:</strong> {location.privacy.hosting ? 'Sim' : 'Não'}</p>
            <p><strong>Serviço:</strong> {location.privacy.service}</p>
          </>
        ) : (
          <p>Sem informações sobre privacidade.</p>
        )}

        <h4>Abuso</h4>
        {location.abuse ? (
          <>
            <p><strong>Endereço de Abuso:</strong> {location.abuse.address}</p>
            <p><strong>País:</strong> {location.abuse.country}</p>
            <p><strong>Email:</strong> {location.abuse.email}</p>
            <p><strong>Telefone:</strong> {location.abuse.phone}</p>
          </>
        ) : (
          <p>Sem informações sobre abuso.</p>
        )}
      </div>
    );
  };

  return (
    <div className="container">
      <h1>Consulta de Localização por IP</h1>
      <form id="ip-form" onSubmit={handleSubmit}>
        <label htmlFor="ip-input">Digite um IP:</label>
        <input
          type="text"
          id="ip-input"
          placeholder="Ex.: 45.164.244.251"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
        />
        <button type="submit">Consultar</button>
      </form>
      <div id="results">
        <h2>Resultado</h2>
        {error && <p>{error}</p>}
        {renderLocationData(location)}
      </div>
    </div>
  );
}

export default App;