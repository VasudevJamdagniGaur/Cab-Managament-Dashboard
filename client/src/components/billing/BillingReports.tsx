import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Download, FileText } from "lucide-react";

// This would come from the API in a real app
interface BillingReport {
  id: number;
  date: Date;
  period: string;
  amount: number;
  status: "Paid" | "Pending";
}

export function BillingReports() {
  const [selectedTab, setSelectedTab] = useState("monthly");
  
  // Mock data for demonstration
  const billingReports: BillingReport[] = [
    { id: 1, date: new Date(2023, 9, 15), period: "October 2023", amount: 386420, status: "Pending" },
    { id: 2, date: new Date(2023, 8, 15), period: "September 2023", amount: 368230, status: "Paid" },
    { id: 3, date: new Date(2023, 7, 15), period: "August 2023", amount: 348790, status: "Paid" },
    { id: 4, date: new Date(2023, 6, 15), period: "July 2023", amount: 295670, status: "Paid" },
    { id: 5, date: new Date(2023, 5, 15), period: "June 2023", amount: 310420, status: "Paid" },
  ];

  // Filter reports based on selected tab
  // In a real app, we would fetch different data based on the tab
  const getReports = () => billingReports;
  
  const handleExportInvoice = () => {
    // In a real app, this would trigger a PDF download
    alert("Invoice exported as PDF");
  };
  
  const handleDownloadSummary = () => {
    // In a real app, this would trigger a CSV download
    alert("Summary downloaded as CSV");
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Billing Reports</CardTitle>
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Billing Period</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getReports().map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(report.date)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.period}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(report.amount)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        report.status === "Paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {report.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <Button variant="outline" className="flex items-center gap-2" onClick={handleExportInvoice}>
              <FileText className="h-4 w-4" />
              <span>Export Invoice (PDF)</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2" onClick={handleDownloadSummary}>
              <Download className="h-4 w-4" />
              <span>Download Summary (CSV)</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default BillingReports;
