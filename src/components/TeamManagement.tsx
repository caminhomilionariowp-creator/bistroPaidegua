import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Edit3, 
  Save, 
  RotateCcw, 
  Camera, 
  CheckCircle2, 
  MessageCircle,
  Sparkles,
  Layers,
  ChefHat,
  FileText,
  AlertTriangle,
  Award,
  CheckSquare,
  Search,
  Briefcase,
  BookOpen
} from 'lucide-react';
import { ResponsibleLeader, EmployeeAccount } from '../types';
import { DEFAULT_TEAM_MEMBERS, saveTeamMembers, loadEmployees, saveEmployees } from '../data/teamData';
import { JOB_ROLES_DATA, JobRoleDescriptor } from '../data/jobRolesData';
import { CharacterAvatar, IllustratedStamp } from './Characters';

interface TeamManagementProps {
  team: ResponsibleLeader[];
  onUpdateTeam: (newTeam: ResponsibleLeader[]) => void;
  onNavigateToPosters?: (posterId: string) => void;
}

export const TeamManagement: React.FC<TeamManagementProps> = ({
  team,
  onUpdateTeam,
  onNavigateToPosters
}) => {
  const [activeTab, setActiveTab] = useState<'leaders' | 'roles'>('leaders');
  const [selectedRoleId, setSelectedRoleId] = useState<string>('auxiliar-cozinha');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ResponsibleLeader | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [employees, setEmployees] = useState<EmployeeAccount[]>(() => loadEmployees());

  const handleStartEdit = (member: ResponsibleLeader) => {
    setEditingId(member.id);
    setFormData({ ...member });
  };

  const handleSave = () => {
    if (!formData) return;
    const updated = team.map(m => m.id === formData.id ? formData : m);
    onUpdateTeam(updated);
    saveTeamMembers(updated);
    setEditingId(null);
    setFormData(null);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Deseja restaurar a equipe padrão do Bistrô Pai d\'Égua?')) {
      onUpdateTeam(DEFAULT_TEAM_MEMBERS);
      saveTeamMembers(DEFAULT_TEAM_MEMBERS);
      setEditingId(null);
    }
  };

  const handleCustomPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && formData) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          photoUrl: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const avatarOptions = [
    { id: 'chef_manel', label: 'Chef Manel (Cozinha)' },
    { id: 'ze_estoque', label: 'Zé do Estoque (Almoxarifado)' },
    { id: 'dona_flor', label: 'Dona Flor (Salão)' },
    { id: 'camila_caixa', label: 'Camila (Caixa)' },
    { id: 'seu_silva', label: 'Seu Silva (Diretoria)' }
  ];

  const currentRole = JOB_ROLES_DATA.find(r => r.id === selectedRoleId) || JOB_ROLES_DATA[0];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 rounded-xl p-6 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
              Gestão de Autoridade & Padrão de Franquia
            </span>
            <span className="text-stone-300 text-xs">• Descritivos Oficiais e Controle de Postos</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2.5">
            <Users className="w-8 h-8 text-emerald-400" />
            Equipe, Postos & Descritivo de Cargos
          </h1>
          <p className="text-sm text-stone-300 max-w-2xl">
            Consulte as atribuições detalhadas do <strong>Auxiliar de Cozinha</strong> e de cada função operacional, com rotinas horárias, regras de ouro, limites inegociáveis e sincronização com os <strong>6 Cartazes A3</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3 self-end md:self-auto">
          <IllustratedStamp type="PADRAO_PAI_DEGUA" size="sm" />
          <button
            onClick={handleResetDefaults}
            className="flex items-center space-x-1.5 text-xs text-stone-300 hover:text-white bg-stone-800/80 hover:bg-stone-700 px-3 py-2 rounded-lg border border-stone-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Padrão</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-stone-200 pb-3">
        <button
          onClick={() => setActiveTab('leaders')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-bold text-xs transition-all ${
            activeTab === 'leaders'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Líderes dos 6 Postos & Contatos</span>
        </button>

        <button
          onClick={() => setActiveTab('roles')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-bold text-xs transition-all ${
            activeTab === 'roles'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <Briefcase className="w-4 h-4 text-amber-500" />
          <span>Descritivo de Cargos & Atribuições (Auxiliar de Cozinha, Chef, etc.)</span>
          <span className="bg-amber-100 text-amber-900 text-[10px] px-2 py-0.5 rounded-full font-extrabold ml-1">
            {JOB_ROLES_DATA.length} Cargos
          </span>
        </button>
      </div>

      {saveSuccess && (
        <div className="bg-emerald-50 border-2 border-emerald-500 text-emerald-950 p-4 rounded-xl flex items-center space-x-3 shadow-sm animate-fade-in">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
          <div>
            <div className="font-bold text-sm">Dados da Equipe Atualizados com Sucesso!</div>
            <div className="text-xs text-emerald-800">
              Todos os cartazes A3, checklists diários e fichas operacionais já estão com as novas informações.
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: LEADERS & CRITCAL POSTS */}
      {activeTab === 'leaders' && (
        <div className="space-y-6">
          {/* Grid of Sector Leaders */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => {
              const isEditing = editingId === member.id;
              const current = isEditing && formData ? formData : member;

              return (
                <div 
                  key={member.id}
                  className={`bg-white rounded-xl border-2 transition-all shadow-sm overflow-hidden flex flex-col justify-between ${
                    isEditing ? 'border-emerald-500 ring-2 ring-emerald-200' : 'border-stone-200 hover:border-emerald-300'
                  }`}
                >
                  {/* Card Header & Sector Bar */}
                  <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
                    <span className="text-xs font-black tracking-wider uppercase text-emerald-900 bg-emerald-100/90 border border-emerald-300 px-2.5 py-1 rounded-md">
                      {current.sectorName}
                    </span>
                    {!isEditing && (
                      <button
                        onClick={() => handleStartEdit(member)}
                        className="flex items-center space-x-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-200 transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Editar Líder</span>
                      </button>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-4 flex-1">
                    {isEditing && formData ? (
                      /* Edit Mode Form */
                      <div className="space-y-3.5 text-xs">
                        <div>
                          <label className="block font-bold text-stone-700 mb-1">Nome do Líder:</label>
                          <input 
                            type="text" 
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full p-2 border border-stone-300 rounded-md font-semibold text-stone-900 focus:border-emerald-500 focus:outline-hidden"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-stone-700 mb-1">Cargo / Função Oficial:</label>
                          <input 
                            type="text" 
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="w-full p-2 border border-stone-300 rounded-md text-stone-800 focus:border-emerald-500 focus:outline-hidden"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-stone-700 mb-1">WhatsApp / Telefone de Contato:</label>
                          <input 
                            type="text" 
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full p-2 border border-stone-300 rounded-md font-mono text-stone-800 focus:border-emerald-500 focus:outline-hidden"
                            placeholder="(91) 98000-0000"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-stone-700 mb-1">Turno de Trabalho:</label>
                          <input 
                            type="text" 
                            value={formData.shift}
                            onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                            className="w-full p-2 border border-stone-300 rounded-md text-stone-800 focus:border-emerald-500 focus:outline-hidden"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-stone-700 mb-1">Responsabilidade Central:</label>
                          <textarea 
                            rows={2}
                            value={formData.mainDuty}
                            onChange={(e) => setFormData({ ...formData, mainDuty: e.target.value })}
                            className="w-full p-2 border border-stone-300 rounded-md text-stone-800 focus:border-emerald-500 focus:outline-hidden"
                          />
                        </div>

                        {/* Avatar Selection & Photo Upload */}
                        <div className="pt-2 border-t border-stone-200">
                          <label className="block font-bold text-stone-700 mb-1.5">Avatar Ilustrado ou Foto Real:</label>
                          <div className="grid grid-cols-5 gap-1.5 mb-2">
                            {avatarOptions.map((av) => (
                              <button
                                key={av.id}
                                type="button"
                                onClick={() => setFormData({ ...formData, photoUrl: av.id })}
                                className={`p-1 rounded-lg border flex flex-col items-center justify-center transition-all ${
                                  formData.photoUrl === av.id ? 'border-emerald-600 bg-emerald-100/60 ring-2 ring-emerald-400' : 'border-stone-200 hover:border-stone-400'
                                }`}
                                title={av.label}
                              >
                                <CharacterAvatar id={av.id} size="sm" />
                              </button>
                            ))}
                          </div>

                          <div className="flex items-center gap-2">
                            <label className="flex-1 cursor-pointer flex items-center justify-center space-x-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 py-1.5 px-3 rounded-md border border-stone-300 transition-colors text-xs font-semibold">
                              <Camera className="w-3.5 h-3.5" />
                              <span>Subir Foto Real</span>
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={handleCustomPhotoUpload}
                              />
                            </label>
                            {formData.photoUrl?.startsWith('data:image') && (
                              <button
                                type="button"
                                onClick={() => setFormData({ ...formData, photoUrl: member.sectorId === 'cozinha' ? 'chef_manel' : member.sectorId === 'estoque' ? 'ze_estoque' : member.sectorId === 'salao' ? 'dona_flor' : member.sectorId === 'caixa' ? 'camila_caixa' : 'seu_silva' })}
                                className="text-[10px] text-rose-600 hover:underline"
                              >
                                Remover Foto
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Display Mode */
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <CharacterAvatar id={member.photoUrl} size="lg" customUrl={member.photoUrl} />
                            <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1 rounded-full shadow-xs">
                              <ShieldCheck className="w-3.5 h-3.5" />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-extrabold text-stone-900 text-base truncate">{member.name}</h3>
                            <p className="text-xs font-semibold text-emerald-800 truncate">{member.role}</p>
                            <div className="flex items-center space-x-1 text-[11px] text-stone-500 mt-1">
                              <Clock className="w-3 h-3 text-stone-400 shrink-0" />
                              <span className="truncate">{member.shift}</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-stone-50 rounded-lg p-3 border border-stone-200 text-xs space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-stone-500 font-medium">WhatsApp Oficial:</span>
                            <a 
                              href={`https://api.whatsapp.com/send?phone=55${member.phone.replace(/\D/g, '')}`}
                              target="_blank" 
                              rel="noreferrer"
                              className="flex items-center space-x-1 font-mono font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-100/70 hover:bg-emerald-200 px-2 py-0.5 rounded transition-colors"
                            >
                              <Phone className="w-3 h-3" />
                              <span>{member.phone}</span>
                            </a>
                          </div>

                          {member.secondaryContact && (
                            <div className="flex items-center justify-between text-[11px] text-stone-500">
                              <span>Substituto Imediato:</span>
                              <span className="font-mono">{member.secondaryContact}</span>
                            </div>
                          )}
                        </div>

                        <div className="text-xs text-stone-600 bg-emerald-50/40 p-2.5 rounded-lg border border-emerald-200/50">
                          <span className="font-bold text-emerald-950 block mb-0.5">Missão Central do Posto:</span>
                          <p className="leading-relaxed">{member.mainDuty}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Footer Actions */}
                  <div className="p-3 bg-stone-50/80 border-t border-stone-200 flex items-center justify-between">
                    {isEditing ? (
                      <div className="flex items-center justify-end w-full gap-2">
                        <button
                          onClick={() => { setEditingId(null); setFormData(null); }}
                          className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 font-semibold"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={handleSave}
                          className="flex items-center space-x-1 px-4 py-1.5 text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow-sm transition-all"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Salvar & Atualizar Cartazes</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between w-full text-xs">
                        <span className="text-[11px] text-stone-400 font-medium">Status: Ativo no Posto</span>
                        <button
                          onClick={() => onNavigateToPosters && onNavigateToPosters(member.sectorId === 'cozinha' ? 'poster-01-cozinha' : member.sectorId === 'estoque' ? 'poster-03-estoque' : member.sectorId === 'salao' ? 'poster-04-salao' : member.sectorId === 'caixa' ? 'poster-05-caixa' : 'poster-06-governanca')}
                          className="text-emerald-700 hover:text-emerald-900 font-bold flex items-center space-x-1"
                        >
                          <Layers className="w-3.5 h-3.5" />
                          <span>Ver no Cartaz A3</span>
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

          {/* Equipe Operacional Completa (Incluindo Auxiliar de Cozinha) */}
          <div className="bg-stone-900 text-white rounded-xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-3">
              <div>
                <h3 className="font-black text-base flex items-center gap-2">
                  <ChefHat className="w-5 h-5 text-amber-400" />
                  Equipe de Execução & Auxiliares do Bistrô
                </h3>
                <p className="text-xs text-stone-400">
                  Colaboradores cadastrados para execução dos checklists diários, mise en place e atendimento.
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveTab('roles');
                  setSelectedRoleId('auxiliar-cozinha');
                }}
                className="self-start sm:self-auto flex items-center space-x-1.5 text-xs font-bold text-amber-300 hover:text-amber-200 bg-amber-950/80 hover:bg-amber-900/80 px-3 py-1.5 rounded-lg border border-amber-600/40 transition-colors"
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Ver Atribuições da Auxiliar de Cozinha</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {employees.map((emp) => (
                <div 
                  key={emp.id} 
                  className={`bg-stone-800/80 border rounded-lg p-4 space-y-2.5 transition-all ${
                    emp.id === 'emp-aux-cozinha' ? 'border-amber-500/60 ring-1 ring-amber-400/30' : 'border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] bg-stone-900 text-stone-300 px-2 py-0.5 rounded-sm border border-stone-700">
                      PIN: {emp.pin} • Crachá: {emp.badgeNumber}
                    </span>
                    <span className="text-[10px] font-bold uppercase text-emerald-400">
                      {emp.primarySector}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-stone-100 flex items-center gap-1.5">
                      {emp.name}
                      {emp.id === 'emp-aux-cozinha' && (
                        <span className="text-[10px] bg-amber-500 text-stone-950 font-extrabold px-1.5 py-0.2 rounded-sm">
                          Destaque
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-stone-400">{emp.role}</p>
                  </div>

                  <p className="text-[11px] text-stone-300 line-clamp-2 bg-stone-900/60 p-2 rounded-sm border border-stone-800">
                    {emp.mainDuty}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1 border-t border-stone-700/60">
                    <span>{emp.shift}</span>
                    <button
                      onClick={() => {
                        setActiveTab('roles');
                        if (emp.primarySector === 'cozinha' && emp.id === 'emp-aux-cozinha') {
                          setSelectedRoleId('auxiliar-cozinha');
                        } else if (emp.primarySector === 'cozinha') {
                          setSelectedRoleId('cozinheiro-lider');
                        } else if (emp.primarySector === 'estoque') {
                          setSelectedRoleId('estoquista-almoxarife');
                        } else if (emp.primarySector === 'salao') {
                          setSelectedRoleId('atendente-garcom');
                        } else if (emp.primarySector === 'caixa') {
                          setSelectedRoleId('operador-caixa');
                        }
                      }}
                      className="text-amber-400 hover:text-amber-300 font-bold hover:underline"
                    >
                      Ver Descritivo
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: JOB ROLES & DETAILED DESCRIPTIONS (DESCRITIVO DE CARGOS) */}
      {activeTab === 'roles' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Role Selection Bar */}
          <div className="bg-white border border-stone-300 rounded-xl p-3 shadow-xs flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider px-2">
              Selecione o Cargo para Visualizar:
            </span>
            {JOB_ROLES_DATA.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRoleId(role.id)}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                  selectedRoleId === role.id
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
                }`}
              >
                {role.id === 'auxiliar-cozinha' && <ChefHat className="w-3.5 h-3.5 text-amber-200" />}
                {role.id === 'cozinheiro-lider' && <Award className="w-3.5 h-3.5 text-emerald-300" />}
                {role.id === 'estoquista-almoxarife' && <Layers className="w-3.5 h-3.5 text-blue-300" />}
                {role.id === 'atendente-garcom' && <Users className="w-3.5 h-3.5 text-orange-300" />}
                {role.id === 'operador-caixa' && <ShieldCheck className="w-3.5 h-3.5 text-teal-300" />}
                <span>{role.title}</span>
              </button>
            ))}
          </div>

          {/* Detailed Job Role Sheet */}
          <div className="bg-white border-2 border-stone-300 rounded-xl shadow-md overflow-hidden">
            {/* Sheet Header */}
            <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 p-6 text-white border-b-2 border-amber-500">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-500 text-stone-950 text-[11px] font-black px-2.5 py-0.5 rounded-sm uppercase tracking-wider">
                      Descritivo Operacional Oficial
                    </span>
                    <span className="text-amber-300 text-xs font-mono">{currentRole.cboCode}</span>
                  </div>
                  <h2 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
                    {currentRole.title}
                  </h2>
                  <p className="text-stone-300 text-xs">
                    Setor: <strong>{currentRole.department}</strong> • Subordinação: <strong>{currentRole.directSupervisor}</strong>
                  </p>
                </div>

                <div className="bg-stone-800/90 border border-stone-700 p-3 rounded-lg text-xs space-y-1 self-start md:self-auto">
                  <div className="text-stone-400">Jornada / Escala:</div>
                  <div className="font-bold text-amber-300">{currentRole.workingShift}</div>
                </div>
              </div>
            </div>

            {/* Sheet Content */}
            <div className="p-6 space-y-8">
              
              {/* 1. Missão Central */}
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-xs space-y-1.5">
                <div className="font-black text-amber-950 uppercase tracking-wider flex items-center gap-2 text-sm">
                  <Award className="w-4 h-4 text-amber-600" />
                  1. Missão Central do Cargo
                </div>
                <p className="text-amber-950 leading-relaxed font-medium">
                  {currentRole.summary}
                </p>
              </div>

              {/* 2. Responsabilidades Principais */}
              <div className="space-y-3">
                <h3 className="font-black text-stone-900 text-sm uppercase tracking-wider flex items-center gap-2 border-b border-stone-200 pb-2">
                  <CheckSquare className="w-4 h-4 text-emerald-700" />
                  2. Atribuições & Responsabilidades Chave
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {currentRole.keyResponsibilities.map((resp, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 bg-stone-50 p-3 rounded-lg border border-stone-200">
                      <span className="w-5 h-5 rounded-full bg-emerald-700 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-stone-800 leading-relaxed font-medium">{resp}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Rotina Horária por Fases do Turno */}
              <div className="space-y-4">
                <h3 className="font-black text-stone-900 text-sm uppercase tracking-wider flex items-center gap-2 border-b border-stone-200 pb-2">
                  <Clock className="w-4 h-4 text-blue-700" />
                  3. Rotina Operacional por Fases do Turno (Passo a Passo)
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {currentRole.shiftRoutine.map((routine, rIdx) => (
                    <div key={rIdx} className="bg-stone-50 border border-stone-300 rounded-xl p-4 space-y-3 flex flex-col justify-between">
                      <div className="border-b border-stone-200 pb-2">
                        <span className="text-[10px] font-mono bg-blue-100 text-blue-900 px-2 py-0.5 rounded-sm font-bold block w-fit mb-1">
                          {routine.timeRange}
                        </span>
                        <h4 className="font-black text-xs text-stone-900">{routine.phase}</h4>
                      </div>
                      <ul className="space-y-2 text-xs flex-1">
                        {routine.tasks.map((task, tIdx) => (
                          <li key={tIdx} className="flex items-start space-x-2 text-stone-700 text-[11px] leading-relaxed">
                            <span className="text-emerald-700 font-bold shrink-0">•</span>
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Regras de Ouro vs Proibições Críticas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Regras de Ouro */}
                <div className="bg-emerald-50 border-2 border-emerald-500 rounded-xl p-4 space-y-3">
                  <h4 className="font-black text-emerald-950 text-xs uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Regras de Ouro Inegociáveis (O que FAZER)
                  </h4>
                  <ul className="space-y-2 text-xs">
                    {currentRole.rulesOfGold.map((rule, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-emerald-900 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Proibições Críticas */}
                <div className="bg-rose-50 border-2 border-rose-500 rounded-xl p-4 space-y-3">
                  <h4 className="font-black text-rose-950 text-xs uppercase tracking-wider flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    Limites Críticos (O que NUNCA Fazer)
                  </h4>
                  <ul className="space-y-2 text-xs">
                    {currentRole.prohibitions.map((prohib, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-rose-900 font-medium">
                        <span className="text-rose-600 font-bold shrink-0">🚫</span>
                        <span className="leading-relaxed">{prohib}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 5. EPIs Obrigatórios & Indicadores de Avaliação */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* EPIs */}
                <div className="space-y-2.5">
                  <h4 className="font-black text-stone-900 text-xs uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-stone-700" />
                    EPIs & Segurança Obrigatória
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    {currentRole.requiredEpi.map((epi, idx) => (
                      <div key={idx} className="bg-stone-100 p-2 rounded-md border border-stone-200 text-stone-800 flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-500 shrink-0"></span>
                        <span className="font-medium">{epi}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Métricas de Desempenho */}
                <div className="space-y-2.5">
                  <h4 className="font-black text-stone-900 text-xs uppercase tracking-wider flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-600" />
                    Indicadores de Sucesso no Posto (KPIs)
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    {currentRole.performanceMetrics.map((kpi, idx) => (
                      <div key={idx} className="bg-amber-50 p-2 rounded-md border border-amber-200 text-amber-950 flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0"></span>
                        <span className="font-bold">{kpi}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Sheet Footer */}
            <div className="p-4 bg-stone-100 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="text-stone-500 font-medium">
                Documento Oficial de Recursos Humanos & Treinamento Operacional • Versão 1.1
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white font-bold rounded-lg transition-colors flex items-center space-x-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Imprimir Descritivo em A4</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Info Callout */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start space-x-3 text-amber-950 text-xs">
        <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold block">Padrão de Governança & Treinamento de Novos Contratados:</span>
          <p className="text-amber-900/90 leading-relaxed">
            Ao contratar um novo <strong>Auxiliar de Cozinha</strong> ou líder de setor, este descritivo deve ser impresso e assinado no primeiro dia de integração, servindo como base para os checklists diários <strong>F-01</strong> e auditorias semanais de conformidade.
          </p>
        </div>
      </div>

    </div>
  );
};
