"use client"

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { Calendar, ChevronLeft, ChevronRight, Utensils, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';


export default function DietDashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock data - replace with actual data from your backend
  const todaysDiet = {
    totalCalories: 1850,
    calorieGoal: 2200,
    meals: [
      {
        time: '8:30 AM',
        name: 'Breakfast',
        foods: ['Oatmeal with banana', 'Greek yogurt'],
        calories: 450,
      },
      {
        time: '12:45 PM',
        name: 'Lunch',
        foods: ['Grilled chicken salad', 'Whole grain bread'],
        calories: 650,
      },
      {
        time: '4:00 PM',
        name: 'Snack',
        foods: ['Apple', 'Almonds'],
        calories: 200,
      },
    ]
  };

  const recommendations = [
    {
      mealType: 'Dinner',
      suggestions: [
        'Grilled salmon with quinoa and roasted vegetables',
        'Lean turkey stir-fry with brown rice',
        'Vegetarian lentil curry with cauliflower rice'
      ],
      reasoning: 'Based on your protein intake being lower today, these options will help meet your daily protein goals.'
    }
  ];

  return (
    <div className="flex flex-col space-y-4 p-4">
      {/* Date Navigation */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
        <Button 
          variant="ghost" 
          onClick={() => {
            const newDate = new Date(selectedDate);
            newDate.setDate(selectedDate.getDate() - 1);
            setSelectedDate(newDate);
          }}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-500" />
          <span className="text-lg font-medium">
            {format(selectedDate, 'MMMM d, yyyy')}
          </span>
        </div>
        <Button 
          variant="ghost"
          onClick={() => {
            const newDate = new Date(selectedDate);
            newDate.setDate(selectedDate.getDate() + 1);
            setSelectedDate(newDate);
          }}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Daily Progress Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Today's Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-500">Calories Consumed</p>
              <p className="text-2xl font-bold">{todaysDiet.totalCalories}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Daily Goal</p>
              <p className="text-2xl font-bold">{todaysDiet.calorieGoal}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Remaining</p>
              <p className="text-2xl font-bold">{todaysDiet.calorieGoal - todaysDiet.totalCalories}</p>
            </div>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${(todaysDiet.totalCalories / todaysDiet.calorieGoal) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Meals List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Utensils className="w-5 h-5" />
            Today's Meals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {todaysDiet.meals.map((meal, index) => (
              <div key={index} className="py-4 first:pt-0 last:pb-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">{meal.name}</p>
                    <p className="text-sm text-gray-500">{meal.time}</p>
                  </div>
                  <p className="font-medium">{meal.calories} cal</p>
                </div>
                <p className="text-sm text-gray-600">
                  {meal.foods.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Personalized Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recommendations.map((rec, index) => (
            <div key={index} className="space-y-3">
              <h3 className="font-medium">Suggested for {rec.mealType}:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {rec.suggestions.map((suggestion, idx) => (
                  <li key={idx} className="text-sm text-gray-600">{suggestion}</li>
                ))}
              </ul>
              <p className="text-sm text-gray-500 italic">{rec.reasoning}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}