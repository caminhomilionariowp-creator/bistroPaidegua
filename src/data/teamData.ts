import { ResponsibleLeader, EmployeeAccount } from '../types';

export const DEFAULT_EMPLOYEES: EmployeeAccount[] = [
  {
    id: 'emp-manel',
    roleId: 'cozinheiro-lider',
    name: 'Chef Manoel (Manel)',
    role: 'Líder de Cozinha & Segurança dos Alimentos',
    primarySector: 'cozinha',
    allowedSectors: ['cozinha'],
    pin: '1111',
    phone: '(91) 98123-4567',
    shift: 'Cozinha — entra ~3h antes de abrir (Sáb–Dom 09h · Qua–Sex 15h30)',
    badgeNumber: 'PD-01',
    photoUrl: 'chef_manel',
    isManager: false,
    active: true,
    mainDuty: 'Garantir 100% dos insumos etiquetados, cumprimento das fichas técnicas e validação de descarte.',
    secondaryContact: '(91) 98111-2233 (Sub-Chefe)'
  },
  {
    id: 'emp-ze',
    roleId: 'estoquista-almoxarife',
    name: 'José Carlos (Zé do Estoque)',
    role: 'Encarregado de Estoque & Conferência',
    primarySector: 'estoque',
    allowedSectors: ['estoque'],
    pin: '2222',
    phone: '(91) 98234-5678',
    shift: 'Estoque — recebimento e preparo antes do serviço',
    badgeNumber: 'PD-02',
    photoUrl: 'ze_estoque',
    isManager: false,
    active: true,
    mainDuty: 'Regra PEPS, controle do Termômetro de Ruptura, conferência no ato de entrega com balança e F-01.',
    secondaryContact: '(91) 98222-3344 (Compras)'
  },
  {
    id: 'emp-flor',
    roleId: 'atendente-garcom',
    name: 'Dona Florinda (Dona Flor)',
    role: 'Líder de Salão & Atendimento Pai d\'Égua',
    primarySector: 'salao',
    allowedSectors: ['salao'],
    pin: '3333',
    phone: '(91) 98345-6789',
    shift: 'Salão — Sáb–Dom 12h–23h30 · Qua–Sex 18h–23h',
    badgeNumber: 'PD-03',
    photoUrl: 'dona_flor',
    isManager: false,
    active: true,
    mainDuty: 'Hospitalidade calorosa, alinhamento de mesas, tempo de retorno de pedidos e pós-venda impecável.',
    secondaryContact: '(91) 98333-4455 (Capitão de Mesa)'
  },
  {
    id: 'emp-camila',
    roleId: 'operador-caixa',
    name: 'Camila Santos',
    role: 'Operadora Líder de Caixa & Fechamento',
    primarySector: 'caixa',
    allowedSectors: ['caixa'],
    pin: '4444',
    phone: '(91) 98456-7890',
    shift: 'Caixa — abre com o serviço, fecha cego após o último cliente',
    badgeNumber: 'PD-04',
    photoUrl: 'camila_caixa',
    isManager: false,
    active: true,
    mainDuty: 'Conferência cega de caixa, validação de sangrias com dupla assinatura e fechamento do F-03.',
    secondaryContact: '(91) 98444-5566 (Financeiro)'
  },
  {
    id: 'emp-silva',
    name: 'Seu Silva & Diretoria',
    role: 'Gestão Executiva, Franqueador & Auditoria Geral',
    primarySector: 'gerencia',
    allowedSectors: ['cozinha', 'estoque', 'salao', 'caixa', 'gerencia'],
    pin: '9999',
    phone: '(91) 98567-8901',
    shift: 'Geral — auditoria e escala (qua a dom)',
    badgeNumber: 'PD-00',
    photoUrl: 'seu_silva',
    isManager: true,
    active: true,
    mainDuty: 'Garantir a execução dos 6 Princípios Inegociáveis, auditoria semanal e sustentabilidade do CMV.',
    secondaryContact: '(91) 98555-6677 (Consultoria)'
  },
  {
    id: 'emp-aux-cozinha',
    roleId: 'auxiliar-cozinha',
    name: 'Raimundo Nonato (Mundico)',
    role: 'Auxiliar de Cozinha & Mise en Place',
    primarySector: 'cozinha',
    allowedSectors: ['cozinha'],
    pin: '1010',
    phone: '(91) 98112-3344',
    shift: 'Cozinha — pré-preparo antes de abrir',
    badgeNumber: 'PD-05',
    photoUrl: 'chef_manel',
    isManager: false,
    active: true,
    mainDuty: 'Corte de legumes, apoio ao rechaud, etiquetagem e lavagem de utensílios.'
  },
  {
    id: 'emp-garcom',
    roleId: 'atendente-garcom',
    name: 'Lucas Pereira',
    role: 'Atendente & Garçom de Salão',
    primarySector: 'salao',
    allowedSectors: ['salao'],
    pin: '3030',
    phone: '(91) 98312-7788',
    shift: 'Salão — Sáb–Dom almoço+jantar · Qua–Sex jantar',
    badgeNumber: 'PD-06',
    photoUrl: 'dona_flor',
    isManager: false,
    active: true,
    mainDuty: 'Acolhimento de clientes, entrega de pratos, reposição de galheteiros e limpeza de mesas.'
  }
];

export const DEFAULT_TEAM_MEMBERS: ResponsibleLeader[] = DEFAULT_EMPLOYEES
  .filter(e => ['emp-manel', 'emp-ze', 'emp-flor', 'emp-camila', 'emp-silva'].includes(e.id))
  .map(e => ({
    id: `leader-${e.primarySector}`,
    sectorId: e.primarySector,
    sectorName: e.primarySector === 'cozinha' ? 'Cozinha & Pré-Preparo' :
                e.primarySector === 'estoque' ? 'Estoque, Almoxarifado & Compras' :
                e.primarySector === 'salao' ? 'Salão, Atendimento & Hospitalidade' :
                e.primarySector === 'caixa' ? 'Frente de Caixa & Blindagem Financeira' :
                'Diretoria, Governança & Padrão de Franquia',
    name: e.name,
    role: e.role,
    photoUrl: e.photoUrl,
    phone: e.phone,
    shift: e.shift,
    mainDuty: e.mainDuty || '',
    secondaryContact: e.secondaryContact
  }));

const EMPLOYEES_STORAGE_KEY = 'bistro_pai_degua_employees_v2';
const CURRENT_EMPLOYEE_KEY = 'bistro_pai_degua_current_emp_v2';
const TEAM_STORAGE_KEY = 'bistro_pai_degua_team_v1';
const SESSION_KEY = 'bistro_pai_degua_sessao_v1';

/** Sessão: quem está logado neste aparelho. Null = mostrar a tela de login. */
export const loadSession = (employees: EmployeeAccount[]): EmployeeAccount | null => {
  try {
    const id = localStorage.getItem(SESSION_KEY);
    if (id) return employees.find((e) => e.id === id && e.active !== false) || null;
  } catch (e) {
    console.error('Falha ao ler sessão', e);
  }
  return null;
};

export const saveSession = (employeeId: string): void => {
  try {
    localStorage.setItem(SESSION_KEY, employeeId);
    localStorage.setItem(CURRENT_EMPLOYEE_KEY, employeeId);
  } catch (e) {
    console.error('Falha ao salvar sessão', e);
  }
};

export const clearSession = (): void => {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (e) {
    console.error('Falha ao encerrar sessão', e);
  }
};

export const loadEmployees = (): EmployeeAccount[] => {
  try {
    const saved = localStorage.getItem(EMPLOYEES_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Retrocompatibilidade: backfill de roleId em dados salvos antes do vínculo com JOB_ROLES_DATA.
        return parsed.map((emp: EmployeeAccount) => {
          if (emp.roleId) return emp;
          const seed = DEFAULT_EMPLOYEES.find((d) => d.id === emp.id);
          return seed?.roleId ? { ...emp, roleId: seed.roleId } : emp;
        });
      }
    }
  } catch (e) {
    console.error('Failed to load employees from localStorage', e);
  }
  return DEFAULT_EMPLOYEES;
};

export const saveEmployees = (employees: EmployeeAccount[]): void => {
  try {
    localStorage.setItem(EMPLOYEES_STORAGE_KEY, JSON.stringify(employees));
  } catch (e) {
    console.error('Failed to save employees to localStorage', e);
  }
};

export const loadCurrentEmployee = (employees: EmployeeAccount[]): EmployeeAccount => {
  try {
    const savedId = localStorage.getItem(CURRENT_EMPLOYEE_KEY);
    if (savedId) {
      const found = employees.find(e => e.id === savedId);
      if (found) return found;
    }
  } catch (e) {
    console.error('Failed to load current employee id', e);
  }
  // Default to Chef Manel or first employee
  return employees[0] || DEFAULT_EMPLOYEES[0];
};

export const saveCurrentEmployeeId = (employeeId: string): void => {
  try {
    localStorage.setItem(CURRENT_EMPLOYEE_KEY, employeeId);
  } catch (e) {
    console.error('Failed to save current employee id', e);
  }
};

export const loadTeamMembers = (): ResponsibleLeader[] => {
  try {
    const saved = localStorage.getItem(TEAM_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load team members from localStorage', e);
  }
  return DEFAULT_TEAM_MEMBERS;
};

export const saveTeamMembers = (team: ResponsibleLeader[]): void => {
  try {
    localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(team));
  } catch (e) {
    console.error('Failed to save team members to localStorage', e);
  }
};

