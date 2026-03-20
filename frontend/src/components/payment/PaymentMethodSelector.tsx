import React from 'react';
import type { PaymentMethod } from '@/types/checkout';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Wallet, CreditCard, Banknote, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({ 
  selectedMethod, 
  onMethodChange 
}) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="bg-emerald-100 p-3 rounded-2xl">
          <CreditCard className="h-6 w-6 text-emerald-600" />
        </div>
        <h2 className="text-3xl font-black tracking-tight text-neutral-900">Payment Method</h2>
      </div>

      <RadioGroup
        value={selectedMethod}
        onValueChange={(value) => onMethodChange(value as PaymentMethod)}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Label
          htmlFor="cash"
          className={cn(
            "flex flex-col items-center gap-4 p-8 rounded-[40px] border-4 cursor-pointer transition-all duration-300 hover:bg-neutral-50",
            selectedMethod === 'CASH' 
              ? "border-emerald-600 bg-emerald-50/50 shadow-2xl shadow-emerald-100" 
              : "border-neutral-100 bg-white"
          )}
        >
          <RadioGroupItem value="CASH" id="cash" className="sr-only" />
          <div className={cn(
            "p-4 rounded-3xl transition-colors duration-300",
            selectedMethod === 'CASH' ? "bg-emerald-600 text-white" : "bg-neutral-100 text-neutral-400"
          )}>
            <Banknote className="h-8 w-8" />
          </div>
          <div className="text-center space-y-1">
            <span className="text-lg font-black tracking-tight text-neutral-900">Cash</span>
            <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest">Pay on Meetup</p>
          </div>
        </Label>

        <Label
          htmlFor="gcash"
          className={cn(
            "flex flex-col items-center gap-4 p-8 rounded-[40px] border-4 cursor-pointer transition-all duration-300 hover:bg-neutral-50",
            selectedMethod === 'GCASH' 
              ? "border-emerald-600 bg-emerald-50/50 shadow-2xl shadow-emerald-100" 
              : "border-neutral-100 bg-white"
          )}
        >
          <RadioGroupItem value="GCASH" id="gcash" className="sr-only" />
          <div className={cn(
            "p-4 rounded-3xl transition-colors duration-300",
            selectedMethod === 'GCASH' ? "bg-emerald-600 text-white" : "bg-neutral-100 text-neutral-400"
          )}>
            <Wallet className="h-8 w-8" />
          </div>
          <div className="text-center space-y-1">
            <span className="text-lg font-black tracking-tight text-neutral-900">GCash</span>
            <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest">Digital Wallet</p>
          </div>
        </Label>

        <Label
          htmlFor="card"
          className={cn(
            "flex flex-col items-center gap-4 p-8 rounded-[40px] border-4 cursor-pointer transition-all duration-300 hover:bg-neutral-50",
            selectedMethod === 'CARD' 
              ? "border-emerald-600 bg-emerald-50/50 shadow-2xl shadow-emerald-100" 
              : "border-neutral-100 bg-white"
          )}
        >
          <RadioGroupItem value="CARD" id="card" className="sr-only" />
          <div className={cn(
            "p-4 rounded-3xl transition-colors duration-300",
            selectedMethod === 'CARD' ? "bg-emerald-600 text-white" : "bg-neutral-100 text-neutral-400"
          )}>
            <CreditCard className="h-8 w-8" />
          </div>
          <div className="text-center space-y-1">
            <span className="text-lg font-black tracking-tight text-neutral-900">Card</span>
            <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest">Credit / Debit</p>
          </div>
        </Label>
      </RadioGroup>

      <div className="p-8 rounded-[40px] bg-white border-none shadow-2xl shadow-neutral-200/50 space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
        {selectedMethod === 'CASH' && (
          <div className="flex items-start gap-4 p-6 rounded-3xl bg-neutral-50 border border-neutral-100 text-neutral-600">
            <Info className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-neutral-900">Pay upon meetup or pickup</p>
              <p className="text-sm">Please prepare the exact amount if possible to facilitate a smooth transaction with the seller.</p>
            </div>
          </div>
        )}

        {selectedMethod === 'GCASH' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="w-48 h-48 bg-neutral-100 rounded-[32px] flex items-center justify-center border-4 border-dashed border-neutral-200">
                <div className="text-center space-y-2">
                  <Wallet className="h-12 w-12 text-neutral-300 mx-auto" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">GCash QR Placeholder</p>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <h4 className="text-xl font-black tracking-tight text-neutral-900">GCash Payment Instructions</h4>
                <ol className="space-y-3 text-sm text-neutral-600 list-decimal list-inside font-medium">
                  <li>Open your GCash app and select "Scan QR"</li>
                  <li>Scan the QR code shown on the left</li>
                  <li>Enter the total amount and confirm payment</li>
                  <li>Take a screenshot of the receipt for your records</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {selectedMethod === 'CARD' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Card Number</Label>
                <Input placeholder="0000 0000 0000 0000" className="h-14 rounded-2xl border-2 border-neutral-100 focus:border-emerald-500 transition-all bg-neutral-50/50" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Cardholder Name</Label>
                <Input placeholder="Juan Dela Cruz" className="h-14 rounded-2xl border-2 border-neutral-100 focus:border-emerald-500 transition-all bg-neutral-50/50" />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-2 md:col-span-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Expiry Date</Label>
                <Input placeholder="MM / YY" className="h-14 rounded-2xl border-2 border-neutral-100 focus:border-emerald-500 transition-all bg-neutral-50/50" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-neutral-400">CVV</Label>
                <Input placeholder="123" type="password" maxLength={3} className="h-14 rounded-2xl border-2 border-neutral-100 focus:border-emerald-500 transition-all bg-neutral-50/50" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
