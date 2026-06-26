import { ArrowLeft, Plus } from "lucide-react";
import { useState } from "react";

interface TestCaseDetailProps {
  testCaseId: string;
  onBack: () => void;
}

interface TestData {
  key: string;
  value: string;
  type: string;
}

interface TestStep {
  stepNumber: number;
  action: string;
  expectedResult: string;
}

interface TestScript {
  language: string;
  code: string;
}

// Mock data cho test case detail
const testCasesData: Record<string, any> = {
  "TC-1001": {
    id: "TC-1001",
    title: "Valid login with correct credentials",
    suite: "Authentication Flow",
    linked: "KAN-9",
    priority: "High",
    status: "passed",
    assignee: "Sarah K.",
    description: "Verify that a user can successfully log in with valid email and password",
    precondition: "User account must exist and be active",
    testData: [
      { key: "email", value: "user@example.com", type: "string" },
      { key: "password", value: "SecurePass123!", type: "password" },
      { key: "expectedStatus", value: "200", type: "number" },
    ],
    testSteps: [
      {
        stepNumber: 1,
        action: "Navigate to login page",
        expectedResult: "Login form is displayed with email and password fields",
      },
      {
        stepNumber: 2,
        action: "Enter valid email in email field",
        expectedResult: "Email is entered and visible in the field",
      },
      {
        stepNumber: 3,
        action: "Enter valid password in password field",
        expectedResult: "Password is masked and visible as dots",
      },
      {
        stepNumber: 4,
        action: "Click Login button",
        expectedResult: "Login request is sent, user is redirected to dashboard",
      },
    ],
    testScript: {
      language: "javascript",
      code: `describe('Valid Login Test', () => {
  it('should log in with valid credentials', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('SecurePass123!');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.get('[data-testid="user-profile"]').should('be.visible');
  });
});`,
    },
  },
  "TC-1002": {
    id: "TC-1002",
    title: "Login fails with wrong password (400 response)",
    suite: "Authentication Flow",
    linked: "KAN-9",
    priority: "High",
    status: "passed",
    assignee: "Sarah K.",
    description: "Verify that login fails with error message when wrong password is provided",
    precondition: "User account must exist",
    testData: [
      { key: "email", value: "user@example.com", type: "string" },
      { key: "password", value: "WrongPassword", type: "password" },
      { key: "expectedStatus", value: "401", type: "number" },
    ],
    testSteps: [
      {
        stepNumber: 1,
        action: "Navigate to login page",
        expectedResult: "Login form is displayed",
      },
      {
        stepNumber: 2,
        action: "Enter correct email",
        expectedResult: "Email is entered",
      },
      {
        stepNumber: 3,
        action: "Enter wrong password",
        expectedResult: "Password field is filled",
      },
      {
        stepNumber: 4,
        action: "Click Login button",
        expectedResult: "Error message appears: 'Invalid email or password'",
      },
    ],
    testScript: {
      language: "javascript",
      code: `describe('Invalid Password Test', () => {
  it('should show error with wrong password', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('WrongPassword');
    cy.get('button[type="submit"]').click();
    cy.get('[data-testid="error-message"]')
      .should('contain', 'Invalid email or password');
  });
});`,
    },
  },
};

export function TestCaseDetail({ testCaseId, onBack }: TestCaseDetailProps) {
  const testCase = testCasesData[testCaseId] || {
    id: testCaseId,
    title: "Unknown Test Case",
    description: "Test case details not found",
  };

  const [activeTab, setActiveTab] = useState<"data" | "steps" | "script">("data");

  const priorityConfig = {
    Critical: "bg-red-100 text-red-700",
    High: "bg-orange-100 text-orange-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-gray-100 text-gray-600",
  };

  const statusConfig = {
    passed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    failed: "bg-red-50 text-red-700 border-red-200",
    blocked: "bg-amber-50 text-amber-700 border-amber-200",
    pending: "bg-gray-100 text-gray-600 border-gray-200",
  };

  const statusLabel = {
    passed: "Passed",
    failed: "Failed",
    blocked: "Blocked",
    pending: "Pending",
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Test Cases
        </button>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 text-[13px] border border-border bg-card text-foreground px-3 py-1.5 rounded-md hover:bg-muted/50 transition-colors">
            Edit
          </button>
          <button className="flex items-center gap-1.5 text-[13px] border border-border bg-card text-foreground px-3 py-1.5 rounded-md hover:bg-muted/50 transition-colors">
            Run Test
          </button>
        </div>
      </div>

      {/* Test Case Header Info */}
      <div className="bg-card border border-border rounded-lg p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[11px] font-mono font-bold text-primary bg-blue-50 px-2 py-1 rounded">
                {testCase.id}
              </span>
              <span
                className={`text-[11px] font-medium px-2 py-1 rounded ${
                  priorityConfig[testCase.priority as keyof typeof priorityConfig]
                }`}
              >
                {testCase.priority}
              </span>
              <span
                className={`text-[11px] font-medium px-2 py-1 rounded border ${
                  statusConfig[testCase.status as keyof typeof statusConfig]
                }`}
              >
                {statusLabel[testCase.status as keyof typeof statusLabel]}
              </span>
            </div>
            <h1 className="text-foreground mb-3">{testCase.title}</h1>
            {testCase.description && (
              <p className="text-[13px] text-muted-foreground">{testCase.description}</p>
            )}
          </div>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-4 gap-4 pt-4 border-t border-border">
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground mb-1">SUITE</p>
            <p className="text-[13px] text-foreground">{testCase.suite}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground mb-1">LINKED REQUIREMENT</p>
            <p className="text-[13px] text-primary font-mono">{testCase.linked}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground mb-1">ASSIGNEE</p>
            <p className="text-[13px] text-foreground">{testCase.assignee}</p>
          </div>
          {testCase.precondition && (
            <div>
              <p className="text-[11px] font-semibold text-muted-foreground mb-1">PRECONDITION</p>
              <p className="text-[13px] text-foreground">{testCase.precondition}</p>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex items-center gap-6">
          {[
            { id: "data", label: "Test Data", icon: "📊" },
            { id: "steps", label: "Test Steps", icon: "📋" },
            { id: "script", label: "Test Script", icon: "💻" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-1 py-3 text-[13px] font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-card border border-border rounded-lg p-5">
        {/* Test Data Tab */}
        {activeTab === "data" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-foreground font-semibold">Test Data</h3>
              <button className="flex items-center gap-1.5 text-[12px] text-primary hover:bg-primary/10 px-2 py-1 rounded transition-colors">
                <Plus className="w-3 h-3" />
                Add Data
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-2 text-[11px] font-semibold text-muted-foreground">Key</th>
                    <th className="text-left px-4 py-2 text-[11px] font-semibold text-muted-foreground">Value</th>
                    <th className="text-left px-4 py-2 text-[11px] font-semibold text-muted-foreground">Type</th>
                    <th className="px-4 py-2 text-[11px] font-semibold text-muted-foreground text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {testCase.testData?.map((data: TestData, idx: number) => (
                    <tr key={idx} className="border-b border-border hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 text-[12px] font-mono text-foreground">{data.key}</td>
                      <td className="px-4 py-3 text-[12px] text-foreground">{data.type === 'password' ? '••••••••' : data.value}</td>
                      <td className="px-4 py-3 text-[12px] text-muted-foreground">
                        <span className="bg-muted/50 px-2 py-1 rounded text-[11px]">{data.type}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-[12px] text-primary hover:text-primary/80 transition-colors font-medium">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Test Steps Tab */}
        {activeTab === "steps" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-foreground font-semibold">Test Steps</h3>
              <button className="flex items-center gap-1.5 text-[12px] text-primary hover:bg-primary/10 px-2 py-1 rounded transition-colors">
                <Plus className="w-3 h-3" />
                Add Step
              </button>
            </div>
            <div className="space-y-3">
              {testCase.testSteps?.map((step: TestStep) => (
                <div
                  key={step.stepNumber}
                  className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary font-semibold text-[12px]">
                        {step.stepNumber}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-[13px] font-semibold text-foreground mb-2">Action</p>
                      <p className="text-[13px] text-muted-foreground mb-3">{step.action}</p>
                      <p className="text-[13px] font-semibold text-foreground mb-2">Expected Result</p>
                      <p className="text-[13px] text-muted-foreground">{step.expectedResult}</p>
                    </div>
                    <button className="text-[12px] text-primary hover:text-primary/80 transition-colors font-medium">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Test Script Tab */}
        {activeTab === "script" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-foreground font-semibold">Test Script</h3>
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-muted-foreground">Language:</span>
                <span className="bg-muted/50 px-2 py-1 rounded text-[12px] font-mono">
                  {testCase.testScript?.language || "javascript"}
                </span>
              </div>
            </div>
            <div className="bg-muted/30 rounded-lg p-4 border border-border overflow-x-auto">
              <pre className="text-[12px] font-mono text-foreground whitespace-pre-wrap break-words">
                {testCase.testScript?.code || "No script available"}
              </pre>
            </div>
            <button className="text-[12px] text-primary hover:bg-primary/10 px-3 py-1.5 rounded transition-colors font-medium">
              Run Script
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
