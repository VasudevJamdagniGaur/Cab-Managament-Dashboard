import { useState } from "react";
import { useLocation } from "wouter";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Import employee data from dummyData
import { employeeStats } from "@/lib/dummyData";

// Define employee interface
interface NewEmployee {
  fullName: string;
  age: string;
  position: string;
  department: string;
  email: string;
  branch: string;
}

export default function AddEmployee() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  // Form state
  const [formData, setFormData] = useState<NewEmployee>({
    fullName: "",
    age: "",
    position: "",
    department: "",
    email: "",
    branch: "Delhi",
  });
  
  // Validation and UI state
  const [errors, setErrors] = useState<Partial<Record<keyof NewEmployee, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Handle input change
  const handleChange = (field: keyof NewEmployee, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when field is edited
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };
  
  // Validate form data
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof NewEmployee, string>> = {};
    
    // Check required fields
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
    if (!formData.age.trim()) {
      newErrors.age = "Age is required";
    } else if (isNaN(Number(formData.age)) || Number(formData.age) <= 0) {
      newErrors.age = "Age must be a valid number";
    }
    
    if (!formData.position.trim()) {
      newErrors.position = "Position is required";
    }
    
    if (!formData.department.trim()) {
      newErrors.department = "Department is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.branch) {
      newErrors.branch = "Branch is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call / data saving
    setTimeout(() => {
      // Create a new employee object
      const newEmployee = {
        id: Math.max(...employeeStats.employees.map(e => e.id)) + 1,
        fullName: formData.fullName,
        branch: formData.branch,
        // These fields would normally be set by the backend or calculated
        totalRides: 0,
        ridesToday: 0,
        ridesThisMonth: 0,
        profileImage: "https://images.unsplash.com/photo-1633332755192-727a05c4013d", // Default profile image
      };
      
      // Add to the employee list (in a real app, this would be an API call)
      employeeStats.employees.push(newEmployee);
      
      // Show success state
      setIsSuccess(true);
      setIsSubmitting(false);
      
      // Show toast notification
      toast({
        title: "Employee Added",
        description: "New employee has been added successfully!",
      });
      
      // Reset form after short delay
      setTimeout(() => {
        setFormData({
          fullName: "",
          age: "",
          position: "",
          department: "",
          email: "",
          branch: "Delhi",
        });
        setIsSuccess(false);
      }, 3000);
    }, 1000);
  };
  
  const handleCancel = () => {
    setLocation("/employees");
  };
  
  return (
    <DashboardLayout title="Add New Employee">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add New Employee</h1>
        <p className="text-gray-600 mt-1">Add a new employee to the system</p>
      </div>
      
      <Card className="max-w-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Employee Information</CardTitle>
        </CardHeader>
        <CardContent>
          {isSuccess ? (
            <Alert className="bg-green-50 text-green-800 border-green-200 mb-4">
              <CheckCircle className="h-4 w-4 mr-2" />
              <AlertDescription>
                Employee added successfully!
              </AlertDescription>
            </Alert>
          ) : null}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
              <Input
                id="fullName"
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                className={errors.fullName ? "border-red-500" : ""}
              />
              {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age">Age <span className="text-red-500">*</span></Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter age"
                value={formData.age}
                onChange={(e) => handleChange("age", e.target.value)}
                className={errors.age ? "border-red-500" : ""}
              />
              {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="position">Position <span className="text-red-500">*</span></Label>
              <Input
                id="position"
                placeholder="Enter position"
                value={formData.position}
                onChange={(e) => handleChange("position", e.target.value)}
                className={errors.position ? "border-red-500" : ""}
              />
              {errors.position && <p className="text-red-500 text-sm">{errors.position}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="department">Department <span className="text-red-500">*</span></Label>
              <Input
                id="department"
                placeholder="Enter department"
                value={formData.department}
                onChange={(e) => handleChange("department", e.target.value)}
                className={errors.department ? "border-red-500" : ""}
              />
              {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="branch">Branch <span className="text-red-500">*</span></Label>
              <Select 
                value={formData.branch} 
                onValueChange={(value) => handleChange("branch", value)}
              >
                <SelectTrigger className={errors.branch ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Delhi">Delhi</SelectItem>
                  <SelectItem value="Mumbai">Mumbai</SelectItem>
                  <SelectItem value="Bangalore">Bangalore</SelectItem>
                  <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                </SelectContent>
              </Select>
              {errors.branch && <p className="text-red-500 text-sm">{errors.branch}</p>}
            </div>
            
            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Add Employee"}
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}